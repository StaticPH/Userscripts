// ==UserScript==
// @name           StackExchange Legacy Comments Expander
// @namespace      https://github.com/StaticPH
// @match          https://askubuntu.com/*
// @match          https://serverfault.com/*
// @match          https://superuser.com/*
// @match          https://stackoverflow.com/*
// @match          https://stackexchange.com/*
// @match          https://*.stackoverflow.com/*
// @match          https://*.stackexchange.com/*
// @version        1.2.0
// @createdAt      11/6/2022, 1:17:14 AM
// @author         StaticPH
// @description    Replace 'Show X more comments' handler for StackExchange sites to better support older browsers; in particular, this enables showing all comments when using Chromium 72.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/legacy_browser_workarounds/stackexchange_legacy_comments_expander.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/legacy_browser_workarounds/stackexchange_legacy_comments_expander.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico
// @grant          none
// @noframes
// @run-at         document-idle
// ==/UserScript==

(function(){
	'use strict';

	function replaceChildrenWithNodes(parentNode, ...newChildren){
		while (parentNode.lastChild){
			parentNode.lastChild.remove();
		}
		if (newChildren !== undefined){
			const replacements = (newChildren.length === 1 && Array.isArray(newChildren[0])) ? newChildren[0] : newChildren;
			parentNode.append(...replacements);
			return true;
		}
		return false;
	}

	async function replaceChildrenWithFetched(parentEle, rawHtml){
		const parser = new DOMParser();
		const responseHtml = parser.parseFromString(rawHtml, 'text/html');
		return replaceChildrenWithNodes(parentEle, ...responseHtml.querySelectorAll('li'));
	}

	function replaceCommentsListFromFetched(insertInto, data){
		const parser = new DOMParser();
		const responseHtml = parser.parseFromString(`<ul class="comments-list">${data}</ul>`, 'text/html');
		return replaceChildrenWithNodes(insertInto, responseHtml.body.firstElementChild);
	}

	const replySVG = '<svg aria-hidden="true" class="fc-black-400 w16 svg-icon iconMessage" width="18" height="18" viewBox="0 0 18 18"><path d="M1 4v14l3-3h11c1.09 0 2-.91 2-2V4c0-1.09-.91-2-2-2H3a2 2 0 0 0-2 2m3 9-1 1V4h12v9zm1-6a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1m1 2a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z"></path></svg>';
	const commentUpvoteSVG = '<svg aria-hidden="true" class="fc-black-400 va-middle w16 svg-icon iconArrowUp" width="18" height="18" viewBox="0 0 18 18"><path d="M1 12h16L9 4z"></path></svg>';
	const ellipsesSVG = '<svg aria-hidden="true" class="fc-black-400 svg-icon iconEllipsisHorizontal" width="17" height="18" viewBox="0 0 17 18"><path d="M3.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M12 8.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0"></path></svg>';

	async function buildReplyTemplate(reply, postID){
		return await `<div id="${reply.id}" itemprop="comment" itemscope="" itemtype="https://schema.org/Comment" role="listitem" data-so-test="reply-parent-comment-0">
			<div class="d-flex fd-column">
				<div class="d-flex g6">
					<div class="flex--item w24">
						<a href="${reply.user.url}" class="s-avatar s-avatar__24 s-user-card--avatar" aria-label="User profile">
							<img class="s-avatar--image" src="${reply.user.profileImageUrl}" alt="">
						</a>
					</div>
					<div class="flex--item d-flex fd-column g8 fl-grow1 overflow-hidden">
						<div class="d-flex jc-space-between">
							<div class="flex--item h24 ai-center s-user-card s-user-card__small lh-md">
								<div class="s-user-card--info" itemprop="author" itemscope="" itemtype="https://schema.org/Person">
									<div class="d-none" itemprop="name">${reply.user.displayName}</div>
									<div class="s-user-card--awards">
										<a href="${reply.user.url}" class="s-user-card--link truncate wmx2 comment-user lh-xs" itemprop="url">${reply.user.displayName}</a>
										<a class="comment-link" href="#comment${reply.id}_${postID}"><time title="${reply.postedAt}" class="s-user-card--time ws-nowrap truncate">${reply.postedAtRelative}</time></a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="flex--item d-flex g6 fl-grow1">
					<div class="flex--item d-flex fd-column ai-center pt4">
						<div class="h100 ml12 mr12 pt4" style="width: 1px"></div>
					</div>
					<div class="flex--item d-flex fd-column g4 fl-grow1">
						<div itemprop="text" class="flex--item fw-normal fs-body1 mb4 ow-anywhere">${reply.htmlBody}</div>
						<time class="d-none" itemprop="datePublished">${reply.postedAt}</time>
						<div class="d-flex g16 pb8">
							<div class="flex--item d-flex ai-center g16 fl-grow1">
								<div class="d-flex jc-space-between fl-grow1">
									<div class="flex--item d-flex ai-center g8">
										<button class="s-btn s-btn__xs s-btn__outlined s-btn__muted s-btn__icon h24 py2" type="button" data-so-test="vote-button-comment-${reply.id}">
											<div class="d-flex ai-center g6">
												<span class="s-btn--icon">${commentUpvoteSVG}</span>
												<!-- if only I knew how I should be getting the current vote count, because it's not part of the reply object -->
												<span class="fw-normal fs-caption fc-black-500">32</span></div>
										</button>
										<button class="s-btn s-btn__xs s-btn__outlined s-btn__muted h24 py2" type="button" data-so-test="reply-button-comment-${reply.id}">
											<div class="d-flex ai-center g6">
												<span class="s-btn--icon">${replySVG}</span> <span class="fw-normal fs-caption fc-black-500">Reply</span>
											</div>
										</button>
										<button class="flex--item s-btn s-btn__xs s-btn__outlined s-btn__muted py2 h24" type="button"
												aria-controls="popover-menu-${reply.id}" aria-expanded="false" aria-label="Open menu"
												data-controller="s-popover" data-action="s-popover#toggle" data-s-popover-placement="bottom-start"
												data-s-popover-toggle-class="is-selected" data-so-test="actions-button-comment-${reply.id}" aria-flowto="false">
											${ellipsesSVG}
										</button>
										<div id="popover-menu-${reply.id}" class="s-popover s-popover__tooltip" role="menu">
											<div class="s-popover--arrow"></div>
											<div class="s-popover--content">
												<ul class="s-menu" role="menu">
													<li role="menuitem">
														<button class="s-block-link h:bg-black-100 js-follow-up-copy-link">Copy link</button>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>`;
	}

	function onExpandComments(evnt){
		if (evnt.target.matches('.answer a.js-show-link, .question a.js-show-link')){
			evnt.stopImmediatePropagation();
			evnt.preventDefault();
			const answer = evnt.target.closest('.answer, .question');
			const postID = answer.getAttribute('data-answerid') || answer.getAttribute('data-questionid');
			const insertInto = answer.querySelector('ul.comments-list');
			fetch(document.location.origin + '/posts/' + postID + '/comments', {
			  'headers': {
				'accept': 'text/html, */*; q=0.01',
			  },
			  'referrerPolicy': 'strict-origin-when-cross-origin',
			  'body': null,
			  'method': 'GET',
			  'mode': 'cors',
			  'credentials': 'include'
			}).then(resp => resp.text())
			/*
			  .then(data => replaceChildrenWithFetched(insertInto, data))
			  .then(()=>{
				evnt.target.parentElement.remove();
				insertInto.setAttribute('data-remaining-comments-count', '0');
			  });
			*/
			  .then(data => replaceChildrenWithFetched(insertInto, data) && evnt.target.parentElement.remove(), insertInto.setAttribute('data-remaining-comments-count', '0'));
		}
		else if (evnt.target.matches('.answer button.comments-link:not([data-so-test*="parent-answer"])')){
			evnt.stopImmediatePropagation();
			evnt.preventDefault();
			const answer = evnt.target.closest('.answer');
			const postID = answer.getAttribute('data-answerid') || answer.getAttribute('data-questionid');
			const followupScriptEle = answer.querySelector('script[type="application/json"]');
			const followupData = JSON.parse(followupScriptEle.textContent);
			const insertInto = answer.querySelector(`#${followupData.containerElementId} [role="list"]`);
			// for (reply of followupData.replies){
			//	insertInto.insertAdjacentHTML('beforeEnd', buildReplyTemplate(reply, postID)); // Doesn't fix the order to be chronological, and that seems like a hassle.
			//}

			fetch(`${document.location.origin}/posts/${postID}/comments`, {
			  'headers': {
				'accept': 'text/html, */*; q=0.01',
			  },
			  'referrerPolicy': 'strict-origin-when-cross-origin',
			  'body': null,
			  'method': 'GET',
			  'mode': 'cors',
			  'credentials': 'include'
			}).then(resp => resp.text())
			  .then(data => requestAnimationFrame(function(){
				replaceCommentsListFromFetched(insertInto, data) && evnt.target.parentElement.remove();
				insertInto.setAttribute('data-remaining-comments-count', '0');
			}));
		}
	}

	// Relevant if using buildReplyTemplate
	// document.head.insertAdjacentHTML('beforeEnd', '<style type="text/css">[itemprop="comment"] .jc-space-between .s-user-card--awards > a {padding-left: 1ch;}</style>');

	document.addEventListener('click', onExpandComments);

})();
