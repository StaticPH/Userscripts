// ==UserScript==
// @name           Bitbucket PR Comment Quick Delete Button
// @namespace      https://github.com/StaticPH
// @match          https://bitbucket.org/*projects/*/repos/*/pull-requests/*/overview
// @version        1.1.0
// @createdAt      11/2/2023, 3:34:18 PM
// @author         StaticPH
// @description    Moves the "Delete" button on PR comments out of a submenu, and further allows skipping the confirmation prompt when the shift key is held.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/bitbucket_pr_comment_quick_delete.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/bitbucket_pr_comment_quick_delete.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://bitbucket.org/favicon.ico
// @grant          none
// @run-at         document-start
// @noframes
// ==/UserScript==

/* oxlint-disable require-await */
(async function(){
	"use strict";

	function mergeObjects(destinationObj, sourceObj) {
		// loop all properties
		for (const propKey in sourceObj) {
			if(sourceObj.hasOwnProperty(propKey)) {
				// leaf
				if(typeof(sourceObj[propKey]) !== 'object' || !destinationObj[propKey]) {
					destinationObj[propKey] = sourceObj[propKey];
					continue;
				}
				// node
				/* oxlint-disable no-unused-expressions */
				sourceObj && mergeObjects(destinationObj[propKey], sourceObj[propKey]);
			}
		}
		return destinationObj;
	}

	const [currentProject, currentRepo, currentPR] = document.location.pathname.replace('/projects/', '').replace('/repos/', '/').replace('/pull-requests/', '/').split('/').slice(0, 3);

	const __commentFetchOptionTemplate = {
		'headers': {
			'accept': 'application/json, text/javascript, */*; q=0.01',
			'accept-language': 'en-US',
			'content-type': 'application/json'
		},
		'body': null,
		'cache': 'no-cache',
		'mode': 'cors',
		'credentials': 'include',
	};

	const __deletePRComment_options = mergeObjects({method: 'DELETE'}, __commentFetchOptionTemplate);
	const __getPRComment_options = mergeObjects({method: 'GET'}, __commentFetchOptionTemplate);

	function __PRComment_addressBuilder(commentID) {
		return `${document.location.origin}/rest/api/latest/projects/${currentProject}/repos/${currentRepo}/pull-requests/${currentPR}/comments/${commentID}`;
		// Nominally equivalent to: return `${document.location.origin}/rest/api/latest${document.location.pathname.split('/').slice(0, -1).join('/')}/comments/${commentID}?version=0`, except version unfortunately isn't implicit;
	}

	const __locale = {
		'en-US': {
			'toolTipHintNoConfirm': 'Hold Shift to skip confirmation',
			'btnLabelDelete': 'Delete',
			'consoleNoConfirmCommentDelete': 'shiftKey held, deleting comment without prompting for confirmation.',
			'consoleCantDeleteComment': 'Error: unable to delete this comment.',
			'consoleCantTargetComment': 'Error: unable to target this comment.',
			'consoleSeekingCommentsWithoutButton': 'Seeking comments in need of quick delete button.',
			'consoleRemindTimerVar': 'window.newCommentChecker holds the id of a timer which will repeat the scan every 3 seconds.',
		},
		localize: function(stringID) {
			const preferredLang = this[navigator.language];
			return (preferredLang && preferredLang[stringID]) ? preferredLang[stringID]: (this['en-US'][stringID] || '');
		}
	};

	const commentDeleteBtnHTML = `<li class="action-item action-delete">
		<button class="css-1vtwu8t commentDeleteButton" data-testid="comment-delete-button" type="button" tabindex="0" title="${__locale.localize('toolTipHintNoConfirm')}">
			<span class="css-1we84oz">${__locale.localize('btnLabelDelete')}</span>
		</button>
	</li>`;

	function commentDeletionNotPermitted(deleteBtn) {
		deleteBtn.toggleAttribute('disabled');
		console.error(__locale.localize('consoleCantDeleteComment'));
	}

	async function onClickQuickDelete(evnt) {
		const closestBtn = evnt.target.closest('button');
		if (! closestBtn || ! closestBtn.matches('.commentDeleteButton')) { return; }
		const commentActions = evnt.target.closest('.comment-actions');
		const commentID = evnt.target.closest('.comment').dataset.commentId;
		const dropdownBtn = commentActions.querySelector(':scope > div:not(.comment-add-reaction) .Droplist__Trigger-sc-1z05y4v-3 > div > button.css-jiizgi');
		if (! dropdownBtn) {
			closestBtn.toggleAttribute('disabled');
			return console.error(__locale.localize('consoleCantTargetComment')); // Execute function and return undefined, but in one line.
		}
		if (evnt.shiftKey) {
			console.log(__locale.localize('consoleNoConfirmCommentDelete'));

			// Send a request to determine the number of times the comment has been modified, because for some silly reason,
			// that's a critical detail when deleting comments, despite the lack of comment history tracking.
			// It seems odd that the API wont allow deleting comments with no regard for whether they've been edited, but it is what it is.
			const version = await fetch( __PRComment_addressBuilder(commentID), __getPRComment_options )
				.then(response => response.json())
				.then(json => json.version);
			// Send the network request for deletion directly, bypassing confirmation.
			await fetch(`${__PRComment_addressBuilder(commentID)}?version=${version || 0}`, __deletePRComment_options).then(
				function onSuccess() { return evnt.target.closest('.activity-item').remove(); },
				function onFailure() { commentDeletionNotPermitted(closestBtn); }
			);
		}
		else {
			dropdownBtn.click();
			requestAnimationFrame(() => undefined); // Briefly delay to allow the dropdown to populate
			const builtinDeleteBtn = commentActions.querySelector('.styledContentContainer-p0j3f7-0 [role="menuitem"][data-testid="delete-comment"]');
			if (! builtinDeleteBtn) {
				return commentDeletionNotPermitted(closestBtn); // Execute function and return undefined, but in one line.
			}
			else {
				builtinDeleteBtn.click();
			}
		}
	}

	function addQuickDeleteButtons() {
		// Find all comment action-lists, and if they haven't already been added, add new quicker (either one or two fewer clicks) button for deleting comments.
		document.querySelectorAll('.comment-actions > .action-list').forEach(actionList =>
			actionList.querySelector(':scope > .action-item.action-delete') || actionList.insertAdjacentHTML('beforeEnd', commentDeleteBtnHTML)
		);
	}

//	function onDocumentLoaded(loadEvnt) {
		// Insert new buttons for faster comment deletion
		console.log(__locale.localize('consoleSeekingCommentsWithoutButton'));
		addQuickDeleteButtons();
		console.log(__locale.localize('consoleRemindTimerVar'));
		// Set a timer to check for additional comments every 3 seconds
		globalThis.newCommentChecker = setInterval(addQuickDeleteButtons, 3000);
		// Add a document-scoped event listener to monitor clicks on quick-delete-comment buttons.
		document.addEventListener('click', onClickQuickDelete);
// 	}

// 	document.addEventListener('load', onDocumentLoaded, {once: true});

})();
