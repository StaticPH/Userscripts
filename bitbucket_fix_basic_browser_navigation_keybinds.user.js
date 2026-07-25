// ==UserScript==
// @name           BitBucket Fix Basic Browser Navigation Keybinds
// @namespace      https://github.com/StaticPH
// @match          https://bitbucket.org/projects/*/repos/*
// @match          https://bitbucket.*.*/projects/*/repos/*
// @version        1.0.0
// @createdAt      1/23/2024, 12:12:24 PM
// @author         StaticPH
// @description    I am sick and tired of BitBucket breaking basic browser keybinds like history navigation! There are some keyboard shortcuts which should not even be possible for a webpage to interfere with under any circumstances.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/bitbucket_fix_basic_browser_navigation_keybinds.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/bitbucket_fix_basic_browser_navigation_keybinds.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://bitbucket.org/favicon.ico
// @grant          none
// @run-at         document-end
// @noframes
// ==/UserScript==

(function(){
	"use strict";

	// And this STILL doesn't fix the page content not always being correct after navigation, because AJAX is stupid like that.
	// let readyForNextNav = true;
	function fixedGlobalKeyBinds(evnt){
		// if (!readyForNextNav){return;}
		if (evnt.altKey && !evnt.repeat && !evnt.shiftKey && !evnt.ctrlKey){
			// readyForNextNav = false;
			switch (evnt.key){
				case "Left":
				case "ArrowLeft":
					evnt.stopImmediatePropagation();
					evnt.stopPropagation();
					evnt.preventDefault();
					window.history.back();
					break;
				case "Right":
				case "ArrowRight":
					evnt.stopImmediatePropagation();
					evnt.stopPropagation();
					evnt.preventDefault();
					window.history.forward();
					break;
			}
			// readyForNextNav = true;
		}
	}
	document.addEventListener('keydown', fixedGlobalKeyBinds);
})();

