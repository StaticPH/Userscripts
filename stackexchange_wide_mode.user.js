// ==UserScript==
// @name           StackExchange Wide Mode
// @namespace      https://github.com/StaticPH
// @match          https://*.stackexchange.com/*
// @match          https://askubuntu.com/*
// @match          https://mathoverflow.com/*
// @match          https://serverfault.com/*
// @match          https://stackapps.com/*
// @match          https://stackexchange.com/*
// @match          https://stackoverflow.com/*
// @match          https://superuser.com/*
// @version        1.0.0
// @createdAt      6/20/2024
// @author         StaticPH
// @description    StackExchange sites should take better advantage of the horizontal screen space, particularly on question pages. This removes the width restrictions on the main content part of those pages.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/stackexchange_wide_mode.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/stackexchange_wide_mode.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://cdn.sstatic.net/sites/stackexchange/Img/favicon.ico
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
		/* Page main content element */
		body > .container:not(.sillyPriorityBump){ max-width: unset; }

		/* body > .container > #content is the child element that actually contains all the questions and answers, without either sidebar. */
		body > .container > #content:not(.sillyPriorityBump){ max-width: unset; }
	`);
})();