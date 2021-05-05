// ==UserScript==
// @name          GitHub Notification Page Tweaks
// @namespace     https://github.com/StaticPH
// @match         https://github.com/notifications*
// @version       1.1
// @author        StaticPH
// @description   Why does GitHub's beta notifications inbox use a "More" dropdown when there's more than enough space for the 2 elements within?
// @description   I don't know, and I dislike having to open a dropdown just to mark something as "read", so I did something about it.
// @license       MIT
// @updateURL     https://raw.githubusercontent.com/StaticPH/Userscripts/master/github_notification_page_tweaks.user.js
// @downloadURL   https://raw.githubusercontent.com/StaticPH/Userscripts/master/github_notification_page_tweaks.user.js
// @homepageURL   https://github.com/StaticPH/UserScripts
// @supportURL    https://github.com/StaticPH/UserScripts/issues
// @icon          https://github.githubassets.com/pinned-octocat.svg
// @run-at        document-idle
// ==/UserScript==

(function(){
	'use strict';

	function moveMarkSomeButtons(){
		let dropdownEntries = document.querySelector('div.js-notifications-mark-selected-actions > details.dropdown.details-overlay > details-menu');
		let dropdown = dropdownEntries.parentElement;
		let btnBar = dropdown.parentElement; //document.querySelector('div.js-notifications-mark-selected-actions');
		dropdownEntries.querySelectorAll('div.js-notification-action').forEach(function(oldNode){
			let ele = oldNode.cloneNode(true);
			ele.classList.add('mr-2');

			let childBtn = ele.querySelector('form > button.d-flex.dropdown-item.btn-link');
			childBtn.classList.remove('dropdown-item', 'btn-link');
			childBtn.classList.add('btn', 'btn-sm');
			btnBar.insertBefore(ele, btnBar.childNodes[0]);
		});
		dropdown.remove();
	};

	function moveMarkAllButtons(){
		let dropdownEntries = document.querySelector('div.js-notifications-mark-all-actions > details.dropdown.details-overlay > details-menu');
		let dropdown = dropdownEntries.parentElement;
		let btnBar = dropdown.parentElement; //document.querySelector('div.js-notifications-mark-all-actions');
		dropdownEntries.querySelectorAll('div.js-notification-action').forEach(function(oldNode){
			let ele = oldNode.cloneNode(true);
			ele.classList.add('mr-2');

			let childBtn = ele.querySelector('form > button.d-flex.dropdown-item.btn-link');
			childBtn.classList.remove('dropdown-item', 'btn-link');
			childBtn.classList.add('btn', 'btn-sm');
			btnBar.insertBefore(ele, btnBar.childNodes[0]);
		});
		dropdown.remove();
	};

	function hasMovedButtons(){
		return document.querySelector('div.js-notification-action > form[data-status="unread"] > button.d-flex.btn.btn-sm') && 
			   document.querySelector('div.js-notification-action > form[data-status="read"] > button.d-flex.btn.btn-sm');
	}
	
	setTimeout(function wait(){
		const loadedMarkSelectedButtons = document.querySelector('div.js-notifications-mark-selected-actions > details.dropdown.details-overlay > details-menu');
		const loadedMarkAllButtons = document.querySelector('div.js-notifications-mark-all-actions > details.dropdown.details-overlay > details-menu');
		if (loadedMarkSelectedButtons && loadedMarkAllButtons){
			moveMarkSomeButtons();
			moveMarkAllButtons();
		}
		setTimeout(wait, 300); // Continue monitoring, because the button bar is reset by a number of user interactions
	});
})();

// Cant figure out how to make any of these actually work correctly
//document.querySelector('div.js-notifications-mark-selected-actions form[data-status="read"] > button.d-flex')
//	for each btn, append to data-hotkey ",k"
//	btn..setAttribute('data-hotkey', btn.getAttribute('data-hotkey') + ',k')
//document.querySelector('div.js-notifications-mark-selected-actions form[data-status="unread"] > button.d-flex')
//	for each, append to data-hotkey ",K"
//	btn..setAttribute('data-hotkey', btn.getAttribute('data-hotkey') + ',K')
//document.querySelector('div.js-notifications-mark-selected-actions form[data-status="archived"] > button[title="Done"].d-flex')
//	for each, append to data-hotkey ",delete" ???
//	btn..setAttribute('data-hotkey', btn.getAttribute('data-hotkey') + ',delete')

/* TODO: "select unread"
	document.querySelector('li.notification-unread input.js-notification-bulk-action-check-item[type="checkbox"]').checked=true;	// toggles checkbox state for first unread notification, but doesn't seem to update the total selection set, as the appropriate action buttons fail to appear. Can't seem to find any events that would normally be responsible for this.
*/
