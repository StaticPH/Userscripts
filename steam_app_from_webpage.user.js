// ==UserScript==
// @name           Another "Open in Steam" Button
// @namespace      https://github.com/StaticPH
// @match          http*://steamcommunity.com/*
// @match          http*://*.steampowered.com/*
// @version        1.0
// @createdAt      11/25/2022, 11:25:51 PM
// @author         StaticPH
// @description    Another of many scripts attempting to add "Open this in the Steam application" functionality to Steam's webpages. Some CSS borrowed from https://greasyfork.org/en/scripts/454372-open-steam-url
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/steam_app_from_webpage.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/steam_app_from_webpage.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://www.google.com/s2/favicons?sz=64&domain=steamcommunity.com
// @grant          none
// @noframes
// @run-at         document-end
// ==/UserScript==

(function(){
	"use strict";
	function inject(){
		const btnInstallSteam = document.querySelector('#global_action_menu > .header_installsteam_btn');
		// SVG from https://fonts.gstatic.com/s/i/materialiconsoutlined/open_in_new/v21/24px.svg
		const svgOpenExternal = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>';

		/*
			In order to consistently place the new "Open in Steam" button
			across all (public?) Steam Store and Steam Community pages, it is
			inserted relative to the "Install Steam" button. As a consequence,
			the "Open in Steam" button is similarly subject to the responsive
			page design; if the "Install Steam" button isn't visible, the
			"Open in Steam" button generally wont be either. An example of such
			such circumstances could be when docking the browser window to one
			side of the screen (Affected by screen size, resolution, and zoom).
		*/
		btnInstallSteam.insertAdjacentHTML('beforeBegin',
			`<div id="openInSteamBtn" class="header_opensteam_btn">
				<a href="steam://openurl/${document.location.href}" class="header_opensteam_btn_content btnv6_blue_hoverfade">
					${svgOpenExternal}
					Open in Steam
				</a>
			</div>`
		);

		document.head.insertAdjacentHTML('beforeEnd', `<style type="text/css">
			#openInSteamBtn {
				display: inline-block;
				margin-right: .5rem;
			}
			#openInSteamBtn > a {
				display: inline-flex;
				color: #e5e4dc !important;
				padding: 0 .5rem 0 .25rem;
				border: none;
				border-radius: unset;
				font-weight: normal;
			}
			#openInSteamBtn > a > svg {
				height: 1rem;
				width: 1rem;
				padding: .25rem;
				margin-right: .125rem;
				fill: #e5e4dc;
			}
			#openInSteamBtn > a:hover {
				color: white !important;
			}
			#openInSteamBtn > a:hover > svg {
				fill: white;
			}
		</style>`);
	}

	window.addEventListener('DOMContentLoaded', inject, {once:true});
})();
