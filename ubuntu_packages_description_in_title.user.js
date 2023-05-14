// ==UserScript==
// @name           Ubuntu Package Description In Title
// @namespace      https://github.com/StaticPH
// @include        /^https?:\/\/packages.ubuntu.com/(en\/)?(source\/)?[^/]+\/[^/]+$/
// @version        1.0
// @createdAt      5/11/2023, 10:00:34 AM
// @author         StaticPH
// @description    Try to provide a minimal, yet meaningful, page title that includes the package description on Ubuntu's package search/archive website.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/ubuntu_packages_description_in_title.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/ubuntu_packages_description_in_title.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://www.google.com/s2/favicons?domain=ubuntu.com&sz=32
// @grant          none
// @noframes
// @run-at         document-idle
// ==/UserScript==

(function(){
	'use strict';

	const [pkg, repo, sourceSegment, /*lang*/] = document.location.pathname.split('/').reverse();

	setTimeout(function wait(){
		// Not going to assume reliability of document.querySelector('meta[name="Description"]').content === document.querySelector('#pdesc').textContent.trim()
		const descriptionEle = document.querySelector('#pdesc');

		if (descriptionEle){
			document.title = `${pkg} – ${descriptionEle.textContent.trim()} | ${sourceSegment.length !== 0 ? 'Source ' : ''}Package in Ubuntu/${repo}`;
		}
		else {
			setTimeout(wait, 500);
		}
	});
})();