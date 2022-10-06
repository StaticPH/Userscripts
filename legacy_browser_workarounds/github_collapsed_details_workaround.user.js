// ==UserScript==
// @name           GitHub Collapsed Details Legacy Workaround
// @namespace      https://github.com/StaticPH
// @match          https://github.com/*/*
// @version        1.0
// @createdAt      9/30/2022, 9:32:58 PM
// @author         StaticPH
// @description    Add simple onclick handlers to the collapsed details of commits on GitHub, as the normal behavior of expanding the ellipses to the full commit message when clicked seems to have broken on legacy browsers as a result of some change to the implementation.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/legacy_browser_workarounds/github_collapsed_details_workaround.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/legacy_browser_workarounds/github_collapsed_details_workaround.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://github.githubassets.com/pinned-octocat.svg
// @grant          none
// @noframes
// @run-at         document-end
// ==/UserScript==

(function(){
	"use strict";

	let hasRefinedGithub = document.querySelector('.refined-github') !== null;

	function toggleShowDetails(evnt){
		// let commitRow = evnt.target.closest('.Details').querySelector('p+*');
		let commitRow = evnt.target.closest('.Details').querySelector('.Details-content--hidden, .Details-content--on') || evnt.target.closest('.Details').querySelector('.text-small').parentElement;
		commitRow.classList.toggle('Details-content--hidden');
		hasRefinedGithub && commitRow.closest('.rgh-dim-bot').classList.toggle('Details--on');
	}

	document.querySelectorAll('.hidden-text-expander > button.ellipsis-expander.js-details-target').forEach(expander => expander.onclick = toggleShowDetails);	
})();
