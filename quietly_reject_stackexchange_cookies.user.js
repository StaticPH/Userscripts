// ==UserScript==
// @name           Quietly Reject StackExchange Cookies
// @namespace      https://github.com/StaticPH
// @match          https://*.stackexchange.com/*
// @match          https://askubuntu.com/*
// @match          https://mathoverflow.com/*
// @match          https://serverfault.com/*
// @match          https://stackapps.com/*
// @match          https://stackexchange.com/*
// @match          https://stackoverflow.com/*
// @match          https://superuser.com/*
// @version        1.0
// @createdAt      5/11/2023, 10:15:04 AM
// @author         StaticPH
// @description    Hide the pesky cookie permission requests on StackExchange sites, which don't actually appear to set even "necessary" cookies until the user responds to the permission prompt. Also hides a few other little things.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/quietly_reject_stackexchange_cookies.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/quietly_reject_stackexchange_cookies.user.js
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
		/* Hide cookie consent prompt */
		.js-consent-banner.z-nav-fixed.ps-fixed {
			display: none;
		}
		/* Hide other random bits and bobs */
		.facebook-login.s-btn__icon.s-btn__muted.s-btn.flex--item,
		.ps-relative.js-freemium-cta {
			display: none;
		}
	`);
})();
