// ==UserScript==
// @name           YouTrack Use Standard Scrollbar
// @namespace      https://github.com/StaticPH
// @match          https://youtrack.jetbrains.com/*
// @version        1.0.0
// @createdAt      8/22/2024, 10:53:27 AM
// @author         StaticPH
// @description    Use the browser's regular scrollbar style on JetBrains' YouTrack pages
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/youtrack_use_standard_scrollbar.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/youtrack_use_standard_scrollbar.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://youtrack.jetbrains.com/static/favicon.ico
// @grant          none
// @run-at         document-end
// @noframes
// ==/UserScript==

(function(){
	"use strict";

	document.head.insertAdjacentHTML('afterBegin', `
		<style type="text/css">
			.yt-custom-scroll:not(.invisible-scrollbar) {
				scrollbar-color: initial;
				scrollbar-width: initial;
			}
		</style>`
	);
})();

