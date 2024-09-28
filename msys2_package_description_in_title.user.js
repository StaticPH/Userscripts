// ==UserScript==
// @name           MSYS Packages Description In Title
// @namespace      https://github.com/StaticPH
// @include        http*://packages.msys2.org/package/*
// @include        http*://packages.msys2.org/packages/*
// @version        1.2.0
// @createdAt      4/28/2021
// @author         StaticPH
// @description    Include the package description on the tab title for a package's page on packages.msys2.org/packages.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/msys2_package_description_in_title.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/msys2_package_description_in_title.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://packages.msys2.org/static/images/logo.svg
// @grant          none
// @run-at         document-idle
// ==/UserScript==

(function(){
	'use strict';

	setTimeout(function wait(){
		const pkgName = document.querySelector('h4.card-title');
		const pkgDesc = document.querySelector('h6.card-subtitle, .card-body > dl > dd:nth-child(6)');

		//TODO: Modify script to also indicate which pkg subpage is currently loaded (if it isnt the readme subpage)

		if (pkgName && pkgDesc){
			document.title=`${pkgName.textContent.trim()} — ${pkgDesc.textContent.trim()}`;
		}
		else{
			setTimeout(wait, 100); // Continue trying every 100ms until success
		}
	});

})();
