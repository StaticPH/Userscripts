// ==UserScript==
// @name           Bitbucket better file page titles
// @namespace      https://github.com/StaticPH
// @match          https://bitbucket.org/projects/*/repos/*
// @match          https://bitbucket.*.*/projects/*/repos/*
// @version        1.0.0
// @createdAt      9/19/2024, 4:36:31 PM
// @author         StaticPH
// @description    Improves browser page titles when browsing repository files on BitBucket
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/bitbucket_better_file_page_titles.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/bitbucket_better_file_page_titles.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://bitbucket.org/favicon.ico
// @grant          none
// @run-at         document-idle
// @noframes
// ==/UserScript==

(function(){
	"use strict";

	if (! document.location.pathname.match(/\/projects\/[^/]+\/repos\/.+/)){ return; }

	const repo = document.querySelector('.aui-nav-breadcrumbs > .aui-nav-selected'), repoName = repo.textContent;
	const project = repo.previousElementSibling, projectName = project.textContent;
	const ref = document.querySelector('.aui-buttons .aui-iconfont-branch+span.name[data-id^="refs/"], .aui-buttons .aui-iconfont-tag+span.name[data-id^="refs/"]'), refStr = ref.textContent;
	const path = document.querySelector('.breadcrumbs'), pathStr = path.textContent.split('/').slice(1).join('/');
	document.title = `${projectName}/${repoName} | ${pathStr}@${refStr}`;
})();
