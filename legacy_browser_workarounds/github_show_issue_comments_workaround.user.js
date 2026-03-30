// ==UserScript==
// @name           GitHub Issue Comments Legacy Workaround
// @namespace      https://github.com/StaticPH
// @match          https://github.com/*/*/issues/*
// @version        1.1.2
// @createdAt      11/10/2025, 6:17:25 PM
// @author         StaticPH
// @description    Manually display comments on Github issues using the JSON that's already on the page, which totally doesn't need React to accomplish.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/legacy_browser_workarounds/github_show_issue_comments_workaround.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/legacy_browser_workarounds/github_show_issue_comments_workaround.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://github.githubassets.com/pinned-octocat.svg
// @grant          none
// @noframes
// @run-at         document-idle
// ==/UserScript==

(function(){
	"use strict";

	const reactionIconHTML = '<svg aria-hidden="true" focusable="false" class="octicon octicon-smiley" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" display="inline-block" overflow="visible" style="vertical-align: text-bottom;"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm3.82 1.636a.75.75 0 0 1 1.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 0 1 1.222.87l-.022-.015c.02.013.021.015.021.015v.001l-.001.002-.002.003-.005.007-.014.019a2.066 2.066 0 0 1-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.331 3.331 0 0 1-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 0 1 .183-1.044ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM5 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5.25 2.25.592.416a97.71 97.71 0 0 0-.592-.416Z"></path></svg>';
	const reactionToolbarHTML = `<div role="toolbar" aria-label="Reactions" class="d-flex gap-1 flex-wrap"><button data-component="IconButton" type="button" aria-haspopup="true" aria-expanded="false" tabindex="0" class="prc-Button-ButtonBase-9n-Xk ReactionViewerAnchor-module__ReactionViewerAnchorButton__TujhO prc-Button-IconButton-fyge7" data-loading="false" data-no-visuals="true" data-size="small" data-variant="default" title="React (not available)">${reactionIconHTML}</button></div>`;

	const fixedStyles = `
		.dShPvE {
			display: flex;
			flex-direction: column;
			gap: 8px;
			border-radius: 6px;
			background-color: var(--bgColor-default,var(--color-canvas-default,#ffffff));
			transition: all 0.2s ease 0s;
			border-width: 1px;
			border-style: solid;
			border-image: initial;
			border-color: var(--borderColor-default,var(--color-border-default,#d0d7de));
			padding-top: 0px;
			padding-bottom: 0px;
		}
		.bkHoaI { opacity: 0; }
		.PphTR {
			background-color: var(--bgColor-muted,var(--color-canvas-subtle,#f6f8fa));
			border-top-left-radius: 6px;
			border-top-right-radius: 6px;
			border-bottom-style: solid;
			border-color: var(--borderColor-default,var(--color-border-default,#d0d7de));
			border-bottom-width: 1px;
			padding: 4px 4px 4px 16px;
		}
		[class*="IssueBodyHeader-module__titleSection__"],
		[class*="ActivityHeader-module__TitleContainer__"] {
			padding-right: .45ch;
		}

		/* FIXME: Honestly, these need to be their own script */
		/* Fix bad padding creating weird-looking empty space on the right side */
		/*body:not(.wgh-disabled)*/ .application-main div[data-target="react-app.reactRoot"] div[class^='ContentWrapper-module__contentContainer__'] {
			padding-left: 0px;
			padding-right: 0px;
		}
		/* Fix repository navigation tabs being clipped if the window is too narrow */
		.UnderlineNav {
			overflow: auto hidden !important;
		}`;

	function mapResponseToNode(response){
		const node = response.node;
		// Known __typename values include: [
		// 'IssueComment', 'LabeledEvent', 'ClosedEvent', 'CrossReferencedEvent'
		// ]
		if (node.__typename === 'IssueComment' && node.author === null){
			// Each *COMMENT* item in a response node has the following properties
			// (non-exhaustive): {
			// 	author:{avatarUrl, id, login, name, profileUrl} || null,
			// 	lastUserContentEdit:{editor:{id, login, url, __typename} || null, id},
			// 	bodyHTML, bodyVersion, createdAt, databaseId, id, lastEditedAt,
			// 	reactionGroups, url,
			// 	__typename: 'User'
			// }
			// Because comments authored by deleted users have a null value for `author`, author properties for such comments require a little fudging.
			node.author = {
				login: 'ghost',
				profileUrl: '/ghost',
				avatarUrl: 'https://avatars.githubusercontent.com/u/10137', // 'https://github.com/ghost.png',
				__typename: 'User',
			}
		}
		/*
		else if (node.__typename === 'LabeledEvent){
			// These items in a response node has the following properties
			// (non-exhaustive): {
			// 	actor: {} || null,
			// 	label: {id, nameHTML, name, color, description}
			// 	createdAt, databaseId, id,
			// 	__typename: 'LabeledEvent'
			// }
		}
		else if (node.__typename === 'ClosedEvent'){
			// These items in a response node has the following properties
			// (non-exhaustive): {
			// 	actor: ???? || null,
			// 	closer: ???? || null,
			// 	closingProjectItemStatus: ???? || null,
			// 	duplicateOf: ???? || null,
			// 	createdAt, databaseId, id, stateReason,
			// 	__typename: 'ClosedEvent'
			// }
		}
		else if (node.__typename === 'CrossReferencedEvent'){
			// These items in a response node has the following properties
			// (non-exhaustive): {
			// 	actor: {avatarUrl, id, login, name:????||null, profileResourcePath},
			// 	innerSource: {__typename, __isReferencedSubject, id, issueTitleHTML, number, repository: {id, name, owner:{login, id}}, stateReason, url},
			// 	source: {__typename, id},
			// 	createdAt, databaseId, id, referencedAt, willCloseTarget,
			// 	__typename: 'CrossReferencedEvent'
			// }
		}
		*/
		return node;
	}

	const dataEle = document.querySelector('[data-target="react-app.embeddedData"]');
	const embeddedData = JSON.parse(dataEle.textContent);
	const responses = embeddedData.payload.preloadedQueries[0].result.data.repository.issue.frontTimelineItems.edges;
	// For some reason I've yet to figure out, there seems to cases where
	// some comments aren't included in ...frontTimelineItems.edges,
	// and thus cant be inserted by this script. I suspect it's some kind of
	// limit to an API, but I'm not sure how to go about compensating.
	const responseNodesData = responses.map(mapResponseToNode);

	const friendlyTimeFormatter = new Intl.DateTimeFormat(navigator.language, {
		numberingSystem: 'ltn', calendar: 'gregory',
		year: 'numeric', month: 'long', day: 'numeric',
		hour: 'numeric', hour12: true, minute: 'numeric', second: 'numeric'
	});

	function buildTimeElement(timestamp){
		// Until I come up with a way to make relative-time-element load
		// (instead of being skipped due to earlier parsing errors),
		// just use the absolute time in a friendly format
		return `<relative-time datetime="${timestamp}">${
			friendlyTimeFormatter.format(new Date(timestamp))
		}</relative-time>`;
	}

	function buildCommentNode(commentNode){
		return `\t<div class="LayoutHelpers-module__timelineElement__ARvqv " data-wrapper-timeline-id="${commentNode.id}">
			<a class="Avatar-module__avatarLink__LpV3I Avatar-module__avatarOuter__oECIk prc-Link-Link-9ZwDx" href="${commentNode.author.profileUrl}" data-hovercard-url="/users/${commentNode.author.login}/hovercard" data-hovercard-type="user" aria-label="@${commentNode.author.login}'s profile" aria-keyshortcuts="Alt+ArrowUp"><img data-component="Avatar" class="Avatar-module__issueViewerAvatar__BECCA Avatar-module__avatarWithDivider__hnvse prc-Avatar-Avatar-0xaUi" alt="${commentNode.author.login}" width="40" height="40" data-testid="github-avatar" src="${commentNode.author.avatarUrl}?size=80" style="--avatarSize-regular:40px;"></a>
			<div class="TimelineRowBorder-module__Box__rci2X">
				<div data-testid="timeline-divider-${commentNode.id}" class="Box-sc-62in7e-0 vLPhg TimelineDivider-module__Box__WVLUW"><div class="TimelineDivider-module__Box_1__I5kSG"></div><div class="Box-sc-62in7e-0 bkHoaI TimelineDivider-module__Box_2__waaIl"></div></div>
				<div data-timeline-event-id="${commentNode.id}" data-highlighted-event="false" data-testid="timeline-row-border-${commentNode.id}" class="Box-sc-62in7e-0 dShPvE">
					<div class="react-issue-comment IssueCommentViewer-module__IssueCommentLayout__JziVo">
						<div data-testid="comment-viewer-outer-box-${commentNode.id}" class="IssueCommentViewer-module__IssueCommentContent__LvnJw">
							<div id="issuecomment-${commentNode.databaseId}" data-testid="comment-header" class="Box-sc-62in7e-0 PphTR ActivityHeader-module__ActivityHeaderContainer__BnNwC">
								<div class="Box-sc-62in7e-0 cLDsRm ActivityHeader-module__activityHeader__ZGlyB ActivityHeader-module__ActivityHeaderGridLayout__yMVDh">
									<h3 class="sr-only">${commentNode.author.login} commented ${buildTimeElement(commentNode.createdAt)}</h3>
									<div class="Box-sc-62in7e-0 busFVx Avatar-module__avatarInner__uWzS0 ActivityHeader-module__AvatarContainer__xieyT">
										<a class="Avatar-module__avatarLink__LpV3I prc-Link-Link-9ZwDx" href="${commentNode.author.profileUrl}" data-hovercard-url="/users/${commentNode.author.login}/hovercard" data-hovercard-type="user" aria-label="@${commentNode.author.login}'s profile" aria-keyshortcuts="Alt+ArrowUp"><img data-component="Avatar" class="Avatar-module__activityAvatar__eGc_v prc-Avatar-Avatar-0xaUi" alt="@${commentNode.author.login}" width="24" height="24" src="${commentNode.author.avatarUrl + (commentNode.author.avatarUrl.includes('?') ? '&' : '?')}v=4&amp;size=48" data-testid="github-avatar" style="--avatarSize-regular:24px;"></a>
									</div>
									<div class="ActivityHeader-module__narrowViewportWrapper__n_VAC ActivityHeader-module__CommentHeaderContentContainer__gEnM_" data-testid="comment-header-left-side-items">
										<div class="ActivityHeader-module__TitleContainer__BARH_"><a class="ActivityHeader-module__AuthorName__VJr9h ActivityHeader-module__AuthorLink__vICr7 color-fg-default prc-Link-Link-9ZwDx" href="${commentNode.author.profileUrl}" data-testid="avatar-link" data-hovercard-url="/users/${commentNode.author.login}/hovercard" data-hovercard-type="user" aria-keyshortcuts="Alt+ArrowUp">${commentNode.author.login}</a></div>
										<div class="ActivityHeader-module__footer__HD8mP ActivityHeader-module__FooterContainer__wZvEq">
											<span class="ActivityHeader-module__HeaderMutedText__D3G5r"><a class="ActivityHeader-module__HeaderLink__WnxQu prc-Link-Link-9ZwDx" href="${commentNode.url}" data-turbo="true">${buildTimeElement(commentNode.createdAt)}</a></span>
											<span class="MarkdownLastEditedBy-module__lastEditInfoContainer--EN_Qz"><!--Future Work--></span>
										</div>
									</div>
									<div data-testid="comment-header-right-side-items" class="ActivityHeader-module__narrowViewportWrapper__n_VAC ActivityHeader-module__ActionsContainer__nFdVb">
										<div class="ActivityHeader-module__EditsContainer__l7sOU"><!--Future Work--></div>
										<div class="ActivityHeader-module__BadgesContainer__iimDP"><!--Future Work--></div>
									</div>
								</div>
							</div>
							<div class="IssueCommentViewer-module__IssueCommentBody__IXu9t"><div data-testid="markdown-body" data-team-hovercards-enabled="true" class="markdown-body" data-turbolinks="false"><div class="Box-sc-62in7e-0 markdown-body NewMarkdownViewer-module__safe-html-box__ZT1eD">${commentNode.bodyHTML}</div></div>${reactionToolbarHTML}</div>
						</div>
					</div>
				</div>
			</div>
		</div>`;
	}

	function buildTimelineNodes(){
		// TODO: handle nodes that aren't actually comments, i.e. those where __typename != 'IssueComment'
		// Will probably want to use a delegating method to determine whether a given node will be a
		// comment or what-have-you, which impacts the properties available on each edge.node object.
		// For the time being, just handle the actual comments.
		return Array.from(
			responseNodesData.filter(e => e.__typename === 'IssueComment'),
			buildCommentNode
		).join('\n');
	}

	function fixIssueTimeline(){
		const commentContainer = document.querySelector('div.react-comments-container > div[class*="IssueViewer-module__commentsContainer"]');
		const frag = document.createDocumentFragment();
		const substContainer = commentContainer.cloneNode();

		// fix borked styles
		substContainer.insertAdjacentHTML('beforeEnd', `<style id="unbork">${fixedStyles}</style>`);

		substContainer.insertAdjacentHTML('beforeEnd', `<h2 class="sr-only">Activity</h2>\n<div data-testid="issue-timeline-container" class="prc-Timeline-Timeline-iQjcc">\n${buildTimelineNodes()}\n</div>`);
		// TODO: figure out if replacing the above with something using generators is more efficient
		frag.append(substContainer);
		commentContainer.replaceWith(frag);
	}

	function redoIssueLabelTooltips(){
		// Add tooltips for long descriptions to Issue labels.
		/*
		document.querySelectorAll('[aria-describedby*="-tooltip"]').forEach(function(ele){
			const tooltipIDSelector = ele.getAttribute('aria-describedby').split(' ').map(s => `[id="${s}"]`).join(',');
			// Even if there may be multiple IDs, as the spec permits, take whatever is found first.
			const descriptor = document.querySelector(tooltipIDSelector);

			if(!descriptor){
				console.warn(`ERROR: unable to find an element matching the selector "${tooltipIDSelector}"`);
				return;
			}
			ele.title = descriptor.textContent.trim();
			descriptor.remove();
			ele.removeAttribute('aria-describedby');
		});
		*/

		// Has a similar overall effect, but less explicit DOM manipulation, I guess?
		document.head.insertAdjacentHTML('beforeEnd', `<style type="text/css">
			.LabelsList-module__labelsListContainer__q43kf {
				position: relative;
				overflow: visible;
			}
			[role="tooltip"] {
				/*visibility: hidden;*/
				display:none;
				position: absolute; top: -2em; left: 2em;
				background-color: white; color: black;
				padding: 0.25em; box-shadow: 2px 2px 1px grey;
			}
			/*[aria-describedby]:hover, [aria-describedby]:focus { position: relative; }*/
			[aria-describedby]:hover [role="tooltip"], [aria-describedby]:focus [role="tooltip"]/*,
			[role="tooltip"]:hover, [role="tooltip"]:focus */{
			  /*visibility: visible;*/
			  display:block;
			  /* overflow: visible; */
			  /*max-width: 50%;*/
			  /*width: max-content;*/
			  min-width: 5rem; height: auto; width: auto;
			}
			</style>
		`);
		// The attribute `role="tooltip"` isn't already added by GitHub, even though aria-describedby is.
		// Not sure what was expected to happen like that.
		document.querySelectorAll('.sr-only[id*="-tooltip"]').forEach(e => e.setAttribute('role', 'tooltip'));
	}

	fixIssueTimeline();
	redoIssueLabelTooltips();

	/*
	document.querySelectorAll('[aria-label="Reactions"]').forEach(function(ele){
		const btn = ele.querySelector('button[aria-labelledby=":rr:"]');
		if (!btn || btn.title){ return; } // No need to substitute a tooltip
		if (btn.ariaDescribedBy === ':rq:-loading-announcement){
			btn.removeAttribute('aria-describedby');
		}
		const oldLabelEle = ele.querySelector('[id=":rr:"]');
		if (!oldLabelEle){ return; } // No need to substitute a tooltip
		btn.title = oldLabelEle.textContent;
		oldLabelEle.remove(); // Will likely break the reaction menu popover, if I ever got around to fixing it in a way that resembles the modern standard behavior.
	});
	*/ // Hardcoded simplification, since the dummy reactions buttons are just constant raw HTML being applied by this script anyways.
})();
