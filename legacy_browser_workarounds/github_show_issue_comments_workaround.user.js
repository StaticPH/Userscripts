// ==UserScript==
// @name           GitHub Issue Comments Legacy Workaround
// @namespace      https://github.com/StaticPH
// @match          https://github.com/*/*/issues/*
// @version        1.1.0
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
	const reactionToolbarHTML = `<div role="toolbar" aria-label="Reactions" class="d-flex gap-1 flex-wrap"><button data-component="IconButton" type="button" aria-haspopup="true" aria-expanded="false" tabindex="0" class="prc-Button-ButtonBase-c50BI ReactionViewerAnchor-module__ReactionViewerAnchorButton--kb52r prc-Button-IconButton-szpyj" data-loading="false" data-no-visuals="true" data-size="small" data-variant="default" id=":rq:" title="React (not available)">${reactionIconHTML}</button></div>`;

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
		.bkHoaI{ opacity: 0; }
		.PphTR {
			background-color: var(--bgColor-muted,var(--color-canvas-subtle,#f6f8fa));
			border-top-left-radius: 6px;
			border-top-right-radius: 6px;
			border-bottom-style: solid;
			border-color: var(--borderColor-default,var(--color-border-default,#d0d7de));
			border-bottom-width: 1px;
			padding: 4px 4px 4px 16px;
		}`;

	const dataEle = document.querySelector('[data-target="react-app.embeddedData"]');
	const embeddedData = JSON.parse(dataEle.textContent);
	const responses = embeddedData.payload.preloadedQueries[0].result.data.repository.issue.frontTimelineItems.edges;
	// Each *COMMENT* item in responseNodesData has the following properties (non-exhaustive): {author:{avatarUrl, id, login, name, profileUrl}, bodyHTML, bodyVersion, createdAt, databaseId, id, lastEditedAt, lastUserContentEdit:{editor:{id, login, url, __typename}, id}, reactionGroups, url}
	const responseNodesData = responses.map(e => e.node);

	function buildCommentNode(commentNode){
		return `\t<div class="LayoutHelpers-module__timelineElement--IsjVR " data-wrapper-timeline-id="{commentNode.id}">
			<a class="Avatar-module__avatarLink--leRdV Avatar-module__avatarOuter--waYVs prc-Link-Link-85e08" href="${commentNode.author.profileUrl}" data-hovercard-url="/users/${commentNode.author.login}/hovercard" aria-label="@${commentNode.author.login}'s profile" aria-keyshortcuts="Alt+ArrowUp"><img data-component="Avatar" class="Box-sc-62in7e-0 iHEZa-d Avatar-module__issueViewerAvatar--LY0E0 Avatar-module__avatarWithDivider--ge7w7 prc-Avatar-Avatar-ZRS-m" alt="${commentNode.author.login}" width="24" height="24" src="${commentNode.author.avatarUrl}&amp;size=48" data-testid="github-avatar" style="--avatarSize-regular:24px;"></a>
			<div class="TimelineRowBorder-module__Box--wRiZZ">
				<div data-testid="timeline-divider-${commentNode.id}" class="Box-sc-62in7e-0 vLPhg TimelineDivider-module__Box--rX5hB"><div class="TimelineDivider-module__Box_1--nXo59"></div><div class="Box-sc-62in7e-0 bkHoaI TimelineDivider-module__Box_2--lsm39"></div></div>
				<div data-timeline-event-id="${commentNode.id}" data-highlighted-event="false" data-testid="timeline-row-border-${commentNode.id}" class="Box-sc-62in7e-0 dShPvE">
					<div class="react-issue-comment IssueCommentViewer-module__IssueCommentLayout--dw0jX">
						<div data-testid="comment-viewer-outer-box-${commentNode.id}" class="IssueCommentViewer-module__IssueCommentContent--NdGAG">
							<div id="issuecomment-${commentNode.databaseId}" data-testid="comment-header" class="Box-sc-62in7e-0 PphTR ActivityHeader-module__ActivityHeaderContainer--fKwFm">
								<div class="Box-sc-62in7e-0 cLDsRm ActivityHeader-module__activityHeader--WiwzD ActivityHeader-module__ActivityHeaderGridLayout--Jwd78">
									<h3 class="sr-only">${commentNode.author.login} commented <relative-time datetime="${commentNode.createdAt}"></relative-time></h3>
									<div class="Box-sc-62in7e-0 busFVx Avatar-module__avatarInner--leXLe ActivityHeader-module__AvatarContainer--p2vAR">
										<a class="Avatar-module__avatarLink--leRdV prc-Link-Link-85e08" href="/${commentNode.author.login}" data-hovercard-url="/users/${commentNode.author.login}/hovercard" aria-label="@${commentNode.author.login}'s profile" aria-keyshortcuts="Alt+ArrowUp"><img data-component="Avatar" class="Box-sc-62in7e-0 lpqPbV Avatar-module__activityAvatar--xUQh3 prc-Avatar-Avatar-ZRS-m" alt="@${commentNode.author.login}" width="24" height="24" src="${commentNode.author.avatarUrl}&amp;v=4&amp;size=48" data-testid="github-avatar" style="--avatarSize-regular:24px;"></a>
									</div>
									<div class="ActivityHeader-module__narrowViewportWrapper--k4ncm ActivityHeader-module__CommentHeaderContentContainer--OOrIN" data-testid="comment-header-left-side-items">
										<div class="ActivityHeader-module__TitleContainer--pa99A"><a class="ActivityHeader-module__AuthorName--Im5nP ActivityHeader-module__AuthorLink--D7Ojk color-fg-default prc-Link-Link-85e08" href="/${commentNode.author.login}" data-testid="avatar-link" data-hovercard-url="/users/${commentNode.author.login}/hovercard" aria-keyshortcuts="Alt+ArrowUp">${commentNode.author.login}</a></div>
										<div class="ActivityHeader-module__footer--ssKOW ActivityHeader-module__FooterContainer--FHEpM">
											<span class="ActivityHeader-module__HeaderMutedText--aJAo0"><a class="ActivityHeader-module__HeaderLink--fStdK prc-Link-Link-85e08" href="${commentNode.url}" data-turbo="true"><relative-time datetime="${commentNode.createdAt}"></relative-time></a></span><span class="MarkdownLastEditedBy-module__lastEditInfoContainer--EN_Qz"><!--Future Work--></span>
										</div>
									</div>
									<div data-testid="comment-header-right-side-items" class="ActivityHeader-module__narrowViewportWrapper--k4ncm ActivityHeader-module__ActionsContainer--Ebsux">
										<div class="ActivityHeader-module__EditsContainer--aMWsI"><!--Future Work--></div>
										<div class="ActivityHeader-module__BadgesContainer--lAU4a"><!--Future Work--></div>
									</div>
								</div>
							</div>
							<div class="IssueCommentViewer-module__IssueCommentBody--xvkt3"><div data-testid="markdown-body" data-team-hovercards-enabled="true" class="markdown-body" data-turbolinks="false"><div class="Box-sc-62in7e-0 markdown-body NewMarkdownViewer-module__safe-html-box--dKCgP">${commentNode.bodyHTML}</div></div>${reactionToolbarHTML}</div>
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
