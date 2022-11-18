// ==UserScript==
// @name           GitHub Line-hyperlinks Legacy Workaround
// @namespace      https://github.com/StaticPH
// @match          https://github.com/*/*/blob/*
// @match          https://github.com/*/*/pull/*/files
// @match          https://github.com/*/*/commit/*
// @version        1.1
// @createdAt      8/10/2022, 5:34:41 PM
// @author         StaticPH
// @description    Add simple onclick handlers to the line numbers when viewing files on GitHub, as the normal behavior of linking directly to a clicked line number seems to have broken on legacy browsers as a result of some change to the implementation.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/legacy_browser_workarounds/github_line_hyperlink_workaround.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/legacy_browser_workarounds/github_line_hyperlink_workaround.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://github.githubassets.com/pinned-octocat.svg
// @grant          none
// @noframes
// @run-at         document-end
// ==/UserScript==

(function(){
	"use strict";

	function lineClickHandler(evnt){
		// This doesn't realign the viewport in an attempt to place the target line at the top.
		// history.pushState(null, document.title, location.origin + location.pathname + '#' + evnt.target.id);

		location.href = location.origin + location.pathname + '#' + evnt.target.id;
		window.scrollTo(null, evnt.target.offsetTop); // worked better than the more intuitive evnt.target.scrollIntoViewIfNeeded(true)
	}

	document.querySelectorAll(
		'table.js-file-line-container > tbody > tr > td.js-line-number.js-code-nav-line-number:first-child,' + // blobs
		'table > tbody > tr > td.js-linkable-line-number.js-code-nav-line-number' // pulls and commits
	).forEach(lineNum => lineNum.onclick = lineClickHandler);
})();
