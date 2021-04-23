// ==UserScript==
// @name        Crates.io Description In Title
// @namespace   https://github.com/StaticPH
// @include     /^https?:\/\/(www\.)?crates\.io\/crates\/[^/]+$/
// @version     1.0
// @author      StaticPH
// @description Replace the unhelpful part of the tab title on a crate.io crate's page with the short description of the crate, if one is provided.
// @description Convenient for bookmarking and tab-saving extensions, as crate's pages on crates.io don't have particularly informative titles by default.
// @license     MIT
// @updateURL   https://raw.githubusercontent.com/StaticPH/Userscripts/master/cratesio_description_in_title.user.js
// @downloadURL https://raw.githubusercontent.com/StaticPH/Userscripts/master/cratesio_description_in_title.user.js
// @homepageURL https://github.com/StaticPH/UserScripts
// @supportURL  https://github.com/StaticPH/UserScripts/issues
// @icon        
// @grant       none
// @run-at      document-idle
// ==/UserScript==

(function(){
	'use strict';	
	
	setTimeout(function wait(){
		const crateName = document.querySelector('div[class*="_header-row"] > div > h1');
		const crateDesc = document.querySelector('div[class*="_description"]');

		//TODO: Modify script to also indicate which crate subpage is currently loaded (if it isnt the readme subpage)
		
		if (crateName && crateDesc){
			document.title=`${crateName.textContent} — ${crateDesc.textContent.trim()}`;
		}
		else{
			setTimeout(wait, 100); // Continue trying every 100ms until success
		}
	});
	
})();
