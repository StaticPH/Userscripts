// ==UserScript==
// @name           I know my hardware is disabled, Google
// @namespace      https://github.com/StaticPH
// @match          https://meet.google.com/*
// @version        1.0
// @createdAt      3/3/2023, 9:58:16 AM
// @author         StaticPH
// @description    Thanks Google, but I'm well aware that my browser hasn't given you permission to access my hardware; I don't need you showing a prompt that can't be closed with a keypress.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/google_meet_ignore_hardware_disabled.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/google_meet_ignore_hardware_disabled.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://cdn.iconscout.com/icon/free/png-32/google-meet-2923654-2416657.png
// @grant          none
// @noframes
// @run-at         document-idle
// ==/UserScript==

(function waitToAct(){
	'use strict';

	let nope = document.querySelectorAll('[data-disable-esc-to-close] button');
	if (nope.length === 0){
		setTimeout(waitToAct, 100);
	}
	else {
		nope.forEach( e => e.textContent === ('Dismiss') && e.click() );
	}
})();