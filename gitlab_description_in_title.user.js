// ==UserScript==
// @name           GitLab Description In Title
// @namespace      https://github.com/StaticPH
// @match          *://gitlab.com/*/*
// @match          *://gitlab.org/*/*
// @match          *://git.synz.io/*/*
// @match          *://gitlab.*.org/*/*
// @match          *://salsa.debian.org/*/*
// @version        1.1
// @createdAt      5/22/2021
// @author         StaticPH
// @description    Try to add the description to the page title on Gitlab repositories.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/gitlab_description_in_title.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/gitlab_description_in_title.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://about.gitlab.com/images/press/logo/svg/gitlab-icon-rgb.svg
// @grant          none
// @run-at         document-idle
// ==/UserScript==

(function(){
	'use strict';

	const maxAttempts = 5;
	let attempt = 1;

	setTimeout(function wait(){
		let title = document.title;
		let description = document.querySelector('meta[name="description"]').content;

		//I've found that Unicode character 0x00B7, "Middle Dot", has led some editors to erroneously interpret the text in encodings other than UTF-8, so let's replace it.
		title = title.replace(/\u00b7/g, '|');

		if (description){
			title = `${title.trim()} — ${description.trim()}`;
		}
		else if (attempt <= maxAttempts){
			setTimeout(wait, attempt * 500);
		}
		document.title = title;
	});

})();
