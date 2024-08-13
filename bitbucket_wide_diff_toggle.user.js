// ==UserScript==
// @name           Wide BitBucket Diff Toggle
// @namespace      https://github.com/StaticPH
// @match          https://bitbucket.org/projects/*/repos/*/pull-requests/*
// @match          https://bitbucket.*.*/projects/*/repos/*/pull-requests/*
// @version        1.0.0
// @createdAt      8/13/2024, 3:44:06 PM
// @author         StaticPH
// @description    Adds a button to switch between the typical PR diff view and a version with less UI clutter and better screen space utilization.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/bitbucket_wide_diff_toggle.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/bitbucket_wide_diff_toggle.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://bitbucket.org/favicon.ico
// @grant          none
// @run-at         document-end
// @noframes
// ==/UserScript==

(function(){
	"use strict";

	document.head.insertAdjacentHTML('beforeEnd',
		`<style type="text/css" id="wider-diff">
			.expand-diff table.diff-text {
				--from-gutter-width: calc(11ch) !important;
				--to-gutter-width: calc(11ch) !important;
			}
			.expand-diff td.diff-gutter.to-gutter,
			.expand-diff td.diff-gutter.from-gutter {
				padding-left: 1ch;
				padding-right: 1ch;
				text-align: center;
			}
			.expand-diff .tabs-pane.active-pane > div {
				height: calc(100vh - 100px) !important;
			}
			.expand-diff main.aui-page-panel-content {
				padding-bottom: 0px !important;
				padding-top: 1vh !important;
			}
			.expand-diff .aui-page-panel.content-body {
				padding-left: 0px !important;
			}
			.expand-diff #pull-requests-container > header.pull-request-header {
				display: none;
			}
			.expand-diff #aui-sidebar-content {
				display: none;
			}
		</style>`.trim()
	);
	const wideDiffToggleID = 'wide-diff-toggle';
	function addToggleBtn(addToEle){
		if (!addToEle){
			console.warn('Unable to add toggle button to non-existent element!.');
			return;
		}
		function wideToggleHandler(evnt){
			if (evnt.target.id === wideDiffToggleID){
				document.body.classList.toggle('expand-diff');
			}
		}
		document.addEventListener('click', wideToggleHandler);

		const btn = document.createElement('button');
		btn.id = wideDiffToggleID;
		btn.textContent = 'Toggle Wide Diff';
		btn.handleToggleFn = wideToggleHandler;

		const btnContainer = document.createElement('li');
		btnContainer.className = 'menu-item expand-diff-btn';
		btnContainer.append(btn);

		addToEle.append(btnContainer);
	}

	function wait(){
		const tabsMenu = document.querySelector('.tabs-menu');
		if (!tabsMenu){
			setTimeout(wait, 500); // Wait half a second before retrying
		}
		else {
			addToggleBtn(tabsMenu);
		}
	}
	requestIdleCallback(wait, {timeout:2000});

})();

