// ==UserScript==
// @name           Softpedia Improvements
// @namespace      https://github.com/StaticPH
// @match          *://www.softpedia.com/*
// @match          *://softpedia.com/*
// @version        1.0.0
// @createdAt      1/4/2024, 8:26:32 PM
// @author         StaticPH
// @description    Cleans up junk on Softpedia, and rewrites product homepage links to use the actual URL instead of calling php code.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/softpedia_improvements.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/softpedia_improvements.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://cdnssl.softpedia.com/_img/favicon-32x32.png
// @grant          none
// @noframes
// @run-at         document-load
// ==/UserScript==

(function(){
	"use strict";

	// Replace "outlink"s with their actual link
	document.querySelectorAll('[data-href]').forEach(e => e.href = e.getAttribute('data-href'));

	// Hide ads and other clutter
	let noClutter = document.createElement('style');
	noClutter.textContent = `
		#cookienotif,
		.bigatf,
		.ad, .adc, .ad-300x600,
		[id*="-ad-"],
		.grid_48.sepbrd4,
		.verspot:not(.posrel),
		.curpo.mgtop_20 {
			display: none !important;
		}
		#swipebox-right, .swipebox-rightxd,
		#swipebox-top {
			display: none !important;
		}
		/*
		#swipebox-action {
			height: auto !important;
		}
		*/
	`;
	document.head.append(noClutter);
})();
