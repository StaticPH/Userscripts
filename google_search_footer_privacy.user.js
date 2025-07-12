// ==UserScript==
// @name           Google Search Footer Privacy
// @namespace      https://github.com/StaticPH
// @match          *://google.com/search
// @match          *://*.google.com/search
// @version        1.1.0
// @createdAt      12/30/2023, 6:16:41 PM
// @author         StaticPH
// @description    Hide the "Location" part of the footer on Google Search results, and don't show the email address of the current user.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/google_search_footer_privacy.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/google_search_footer_privacy.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_48dp.png
// @grant          GM_addStyle
// @grant          GM.addStyle
// @noframes
// @run-at         document-end
// ==/UserScript==

(function(){
	"use strict";

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
		/* Hide email address of currently logged in user, if applicable */
		/* #EOlPnc > :nth-last-child(2):not(:first-child) > :first-child:not(:last-child), */
		/* Hide Location */
		#EOlPnc > .Srfpq, .dfB0uf {
			display: none !important;
		}

		/* Hide email address of currently logged in user, AND hide "Sign Out" link. Also hides "Sign In" link if not logged in. */
		#EOlPnc > :nth-last-child(2):not(:first-child) > span {
			font-size: 0;
		}
		/* Unhide JUST the "Sign In" or "Sign Out" link.
		 * Instead of "visibility: hidden" or "opacity: 0" above, which would keep the layout intact, using "font-size: 0" will
		 * allow child elements with a non-zero "font-size" to realign, which re-centers the "Sign Out" link that is normally offset
		 * due to the presence of the email. Furthermore, this method allows hiding text nodes, such as the "&nbsp;-&nbsp;" that would
		 * otherwise be placed between the email and the "Sign Out" link.
		 * The caveat to this is that simply setting "font-size" to initial, unset, or inherit is insufficient to show specific elements
		 * again with their previous size, if that size is different from "font-size: initial"; in such a case, the size needs to be
		 * hard-coded.
		 */
		#EOlPnc > :nth-last-child(2):not(:first-child) > span > a {
			font-size: 14px;
		}
	`);
})();
