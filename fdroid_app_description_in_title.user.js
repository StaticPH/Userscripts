// ==UserScript==
// @name           Better F-Droid App Titles
// @namespace      https://github.com/StaticPH
// @match          https://f-droid.org/en/packages/*
// @version        1.0.0
// @createdAt      8/15/2025, 11:47:05 PM
// @author         StaticPH
// @description    Adds app description to page titles where possible.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/fdroid_app_description_in_title.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/fdroid_app_description_in_title.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://f-droid.org/assets/favicon-32x32_Dk3aeG3k_A20gYe5zAlPSBx_CEcpJaCI89K2X2z6CFY=.png
// @grant          none
// @noframes
// @run-at         document-end
// ==/UserScript==

(function(){
	"use strict";

	const trailer = ' | F-Droid - Free and Open Source Android App Repository';
	const pkgNameEle = document.querySelector('.package-name');
	const appID = document.location.pathname.replace(/.+\/packages\//, '').replace(/\/.*/,'');
	const pkgName = pkgNameEle && pkgNameEle.textContent ? pkgNameEle.textContent.trim() : appID;
	const pkgSummaryEle = document.querySelector('.package-summary');
	let pkgSummary;
	if (pkgSummaryEle && pkgSummaryEle.textContent){
		pkgSummary = pkgSummaryEle.textContent.trim();
	}
	else {
		const pkgDescEle = document.querySelector('.package-description');
		pkgSummary = pkgDescEle && pkgDescEle.firstChild && pkgDescEle.firstChild.textContent && pkgDescEle.firstChild.textContent.split(/[.!]\W/)[0].trim() || 'ERROR';
	}
	document.title = `${pkgName} | ${pkgSummary}${trailer}`;
})();
