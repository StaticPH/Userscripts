// ==UserScript==
// @name           Legacy Discussion Forum Scroll Fixer
// @namespace      https://github.com/StaticPH
// @match          https://discuss.python.org/*
// @match          https://discourse.cmake.org/*
// @version        1.0
// @createdAt      6/29/2024, 6:24:11 PM
// @author         StaticPH
// @description    Fix for Discourse forums breaking the ability to scroll on browsers that are too old or are blocking some script or other.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/legacy_browser_workarounds/discourse_forum_scroll_fixer.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/legacy_browser_workarounds/discourse_forum_scroll_fixer.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon
// @grant          GM.addStyle
// @grant          GM_addStyle
// @noframes
// @run-at         document-end
// ==/UserScript==

(function(){
	'use strict';

	// Prefer asychronous Greasemonkey4-API GM.addStyle, but allow use of GM_addStyle as a fallback if necessary.
	if (typeof GM == 'undefined'){
		this.GM = {};
	}
	if (typeof GM['addStyle'] == 'undefined'){
		console.log('GM.addStyle is not defined. Falling back to GM_addStyle Promise.');
		GM['addStyle'] = function(...args){
			return new Promise((onResolve, onReject) => {
				try{ onResolve(GM_addStyle.apply(this, args)); }
				catch(err){ onReject(err); }
			});
		}
	}

	GM.addStyle(`
		html:not(.dumb) {
			overflow-y: scroll !important;
		}
	`);
})();
