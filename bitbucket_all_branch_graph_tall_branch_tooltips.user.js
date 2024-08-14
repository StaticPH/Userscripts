// ==UserScript==
// @name           Multiline BitBucket All Branch Graph Condensed Labels Tooltip
// @namespace      https://github.com/StaticPH
// @match          https://bitbucket.org/plugins/servlet/bb_ag/projects/*/repos/*/commits
// @match          https://bitbucket.*.*/plugins/servlet/bb_ag/projects/*/repos/*/commits
// @version        1.0.0
// @createdAt      8/14/2024, 4:06:48 PM
// @author         StaticPH
// @description    The All Branches Graph plugin collapses long branch names into the tooltip of an element showing the number of branches collapsed. Normally, it separates those branch names in the tooltip with commas, which can be hard on the eyes to follow. This script separates them with newlines instead.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/bitbucket_all_branch_graph_tall_branch_tooltips.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/bitbucket_all_branch_graph_tall_branch_tooltips.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://bitbucket.org/favicon.ico
// @grant          none
// @run-at         document-idle
// @noframes
// ==/UserScript==

(function(){
	"use strict";

	if (!String.prototype.hasOwnProperty('replaceAll')){
		Object.defineProperty(String.prototype, 'replaceAll', {
			writable: true, enumerable: false, configurable: true,
			value: function replaceAll(searchValue, newValue){
				return this.replace( RegExp(searchValue, 'g'), newValue );
			}
		});
	}

	function onHoverMoreBranches(evnt){
		if (!evnt.target.matches('a.noUnderline > text')){ return; }
		const anchor = evnt.target.parentElement;
		const oldTitle = anchor.getAttribute('title');
		anchor.setAttribute('title', oldTitle.replaceAll(', ','\n'));
	}
	document.addEventListener('pointerover', onHoverMoreBranches);
})();

