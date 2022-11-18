// ==UserScript==
// @name           Crates.io Description In Title
// @namespace      https://github.com/StaticPH
// @include        /^https?:\/\/(www\.)?crates\.io\/crates\/[^/]+(\/)?$/
// @include        /^https?:\/\/(www\.)?crates\.io\/crates\/[^/]+\/[0-9.]+(\/)?$/
// @include        /^https?:\/\/(www\.)?crates\.io\/crates\/[^/]+?\/versions(\/|\?page=[0-9]+)?$/
// @include        /^https?:\/\/(www\.)?crates\.io\/crates\/[^/]+?\/(reverse_)?dependencies(\/|\?page=[0-9]+)?$/
// @include        /^https?:\/\/(www\.)?crates\.io\/crates\/[^/]+?\/[0-9.]+\/dependencies(\/|\?page=[0-9]+)?$/
// @version        1.1
// @createdAt      3/16/2021
// @author         StaticPH
// @description    Replace the unhelpful part of the tab title on a crate.io crate's page with the short description of the crate, if one is provided. Indicates subpage when not on the Readme.
// @description    Convenient for bookmarking and tab-saving extensions, as crate's pages on crates.io don't have particularly informative titles by default.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/cratesio_description_in_title.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/cratesio_description_in_title.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://crates.io/favicon.ico
// @grant          none
// @run-at         document-idle
// ==/UserScript==

(function(){
	'use strict';

	let [secondLastSegment, lastSegment] = location.pathname.replace(/\/$/, '').split('/').slice(-2);

	if (secondLastSegment == 'crates' || lastSegment.match(/^[0-9.]+$/)){
		let versionString = lastSegment.match(/^[0-9.]+$/) ? '/' + lastSegment : '';
		/*
			EITHER
			The second-last component of the URL path is 'crates', which will only occur on the Readme (default) subpage for a crate.
			OR
			The last component of the URL path is composed entirely of numbers and period characters ('.'), which will only occur on the Readme (default) subpage for an old version of a crate.
		*/
		setTimeout(function wait(){
			const crateDesc = document.querySelector('div[class*="_description"]');
			const crateName = document.querySelector('div[class*="_header-row"] > div > h1') || (crateDesc !== null ? crateDesc.previousElementSibling.firstElementChild : null);

			if (crateName && crateDesc){
				document.title=`${crateName.textContent}${versionString} — ${crateDesc.textContent.trim()}`;
			}
			else{
				setTimeout(wait, 100); // Continue trying every 100ms until success
			}
		});
	}
	else{
		/* This is currently either the versions, dependencies, or reverse_dependencies subpage for a crate. */
		let fellBackOnTitle = false;
		let versionString = secondLastSegment.match(/^[0-9.]+$/) ? '/' + secondLastSegment : '';

		setTimeout(function wait(){
			const crateDesc = document.querySelector('div[class*="_description"]');
			const crateName = document.querySelector('div[class*="_header-row"] > div > h1') || (crateDesc !== null ? crateDesc.previousElementSibling.firstElementChild : null);
			const crateSubpage = document.querySelector('a[class*="_active_"]');

			if (crateName && crateDesc && crateSubpage){
				document.title=`${crateName.textContent}${versionString}/${crateSubpage.textContent.replace(/[0-9]/g, '').trim()} — ${crateDesc.textContent.trim()}`;
			}
			else if (!fellBackOnTitle && crateName && crateSubpage){
				document.title=`${crateName.textContent}${versionString}/${crateSubpage.textContent.replace(/[0-9]/g, '').trim()}`;
				fellBackOnTitle = true;
			}
			else{
				setTimeout(wait, 100); // Continue trying every 100ms until success
			}
		});
	}
})();
