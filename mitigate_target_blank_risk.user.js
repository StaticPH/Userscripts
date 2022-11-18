// ==UserScript==
// @name           Mitigate target _blank Risk
// @namespace      https://github.com/StaticPH
// @match          *://*/*
// @version        1.1
// @createdAt      8/27/2021
// @author         StaticPH
// @description    This script appends `rel="noopener noreferrer"` to every link that has `target="_blank"`, as it prevents a major security risk.
// @license        MIT
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/mitigate_target_blank_risk.user.js
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/mitigate_target_blank_risk.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           
// @grant          GM_getValue
// @run-at         
// ==/UserScript==


//NOTE: This script only does anything when the window receives the load event; content dynamically loaded into the page as a result of user interaction should not be processed, unless it is first loaded into an iframe, in which case I'm honestly unsure.
(function(){
	"use strict";

	/* URL origins from which links should NOT have noopener/noreferrer added by the script */
	var allowedOrigins = [
		'https://discord.gg',
		'https://twitch.tv',
		'https://jtvnw.net',
		'https://ttvnw.net',
		'https://jshint.com'
	];

	function addFromCustomAllowList(){
		/*
		  The user can use a custom Allow List by creating the key 'customAllowedOrigins' in the script's value storage.
		  The 'customAllowedOrigins' key and value will not be created, modified, or deleted by the script, only read.
		  Custom allowed origins are then added by parsing the value associated with 'customAllowedOrigins', with origins delimited by a single space character ' '.
		  That is, the value should be a string consisting of space-separated URL origins, e.g. 'http://wordpress.com https://stackexchange.com'
		*/
		if (typeof GM_getValue !== "undefined"){
			allowedOrigins.concat(GM_getValue('customAllowedOrigins', '').split(' '));
		}
	}

	addFromCustomAllowList();

	let splitRel;
	function cleanse(){
		// Unsure whether to prefer getElementByTagName('a')+if target=='_blank' OR querySeletorAll('a[target="_blank"]')
		Array.from(document.getElementsByTagName('a')).forEach( (link) => {
			if (link.target == '_blank'){
				if (allowedOrigins.includes(link.origin)){
					console.log('Found link with allowed origin:"' + link.origin + '" and target="_blank". The link\'s "rel" attribute will not be modified.');
				}
				else {
					console.log('Found link to href:"' + link.href + '" with target="_blank". Including "noopener noreferrer" in link\'s "rel" attribute.');
					splitRel = link.rel.split(' ');
					if (! splitRel.includes('noopener') ){ splitRel.push('noopener'); }
					if (! splitRel.includes('noreferrer') ){ splitRel.push('noreferrer'); }
					link.rel = splitRel.join(' ');
				}
			}
		});
	}
	window.addEventListener('load', cleanse);

})();
