// ==UserScript==
// @name          Lib.rs Description In Title
// @namespace     https://github.com/StaticPH
// @include       https://lib.rs/crates/*
// @version       1.0
// @author        StaticPH
// @description   Replace the unhelpful part of the tab title on a crate's lib.rs page with the short description of the crate, if one is provided.
// @license       MIT
// @updateURL     https://raw.githubusercontent.com/StaticPH/Userscripts/master/librs_description_in_title.user.js
// @downloadURL   https://raw.githubusercontent.com/StaticPH/Userscripts/master/librs_description_in_title.user.js
// @homepageURL   https://github.com/StaticPH/UserScripts
// @supportURL    https://github.com/StaticPH/UserScripts/issues
// @icon          https://lib.rs/favicon.png
// @grant         none
// @run-at        document-idle
// ==/UserScript==

(function(){
	'use strict';	
	
	setTimeout(function wait(){
		const crateName = document.querySelector('div.inner-col > h2 > span[property="name"]');
		const crateDesc = document.querySelector('div.inner-col > p.desc');

		//TODO: Modify script to also indicate which crate subpage is currently loaded (if it isnt the readme subpage)
		
		if (crateName && crateDesc){
			document.title=`${crateName.textContent.trim()} — ${crateDesc.textContent.trim()}`;
		}
		else{
			setTimeout(wait, 100); // Continue trying every 100ms until success
		}
	});
	
})();
