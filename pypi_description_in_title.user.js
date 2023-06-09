// ==UserScript==
// @name           PyPI Description In Title
// @namespace      https://github.com/StaticPH
// @match          https://pypi.org/project/*
// @version        1.0
// @createdAt      5/31/2023, 10:44:40 AM
// @author         StaticPH
// @description    Rewrite the page title for a PyPI package to include a brief summary, when available. Also doesn't use that centered dot character as a separator.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/pypi_description_in_title.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/pypi_description_in_title.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://pypi.org/static/images/logo-small.2a411bc6.svg
// @grant          none
// @run-at         document-end
// @noframes
// ==/UserScript==

(function(){
	'use strict';

	const pkgName = document.location.pathname.slice(9).split('/')[0];
	setTimeout(function wait(){
		const pkgDesc = document.querySelector('.package-description__summary');

		if (pkgDesc){
			document.title = `${pkgName} — ${pkgDesc.textContent.trim()} | PyPI`;
		}
		else{
			setTimeout(wait, 100); // Continue trying every 100ms until success
		}
	});
})();