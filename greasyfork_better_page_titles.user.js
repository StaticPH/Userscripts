// ==UserScript==
// @name           Better Greasy Fork Page Titles
// @namespace      https://github.com/StaticPH
// @match          https://greasyfork.org/*/scripts/*
// @match          https://sleazyfork.org/*/scripts/*
// @version        1.0.0
// @createdAt      11/15/2025, 3:33:58 PM
// @author         StaticPH
// @description    Include userscript descriptions in page titles on Greasy Fork and Sleazy Fork
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/greasyfork_better_page_titles.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/greasyfork_better_page_titles.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://greasyfork.org/vite/assets/blacklogo16-DftkYuVe.png
// @grant          none
// @noframes
// @run-at         document-end
// ==/UserScript==

(function(){
	"use strict";

	// Get the description from the visible element, rather than from
	// the meta tag in document.head; the latter changes based on
	// which tab (Info/Code/History/Feedback/Stats) is active.
	const descEle = document.querySelector('#script-description');
	// Guard against a missing description element (which should never occur).
	const descValue = descEle !== null ? descEle.textContent.trim() : 'No description';
	// Guard against the description element's text being only whitespace or an empty string.
	const desc = descValue !== '' ? descValue : 'No description';

	// Get the script title from the visible element, rather than from
	// the existing document title; the latter changes based on
	// which tab (Info/Code/History/Feedback/Stats) is active.
	const scriptTitleEle = document.querySelector('#script-info > header > h2');
	// Fallback to actual page title only if necessary, which is less desirable because it makes extraKeyword seem out of place on all but the Info tab.
	const scriptTitle = scriptTitleEle !== null ? scriptTitleEle.textContent.trim() : document.title;

	// For the purposes of searching through bookmarks and the like,
	// ensure that the keyword "userscript" is always present in the title
	const extraKeyword = scriptTitle.toLowerCase().includes('userscript') ? '' : ' userscript';

	// If not viewing the first tab (Info), include the name of the tab in the updated title.
	const tabLabelEle = document.querySelector('#script-links > .current:not(:first-of-type)');
	const tabLabel = tabLabelEle !== null ? ` (${tabLabelEle.textContent.trim().split(' ')[0]})` : '';

	document.title = `${scriptTitle}${extraKeyword}${tabLabel} — ${desc}`;

})();
