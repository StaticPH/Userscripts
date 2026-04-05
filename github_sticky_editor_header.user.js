// ==UserScript==
// @name           Github Sticky Editor Header
// @namespace      https://github.com/StaticPH
// @match          http*://github.com/*/*/edit/*
// include         /https?:\/\/github\.com\/[^\/]+\/[^\/]+\/edit\/.+\.(md|MD|Md|adoc|asciidoc|rst)/
// @version        1.0.1
// @createdAt      11/24/2021, 1:50:21 AM
// @author         StaticPH
// @description    Makes the header of the (text) file editor on GitHub sticky.
// @description    Nice for when you are frequently switching between edit and preview while editing in the middle of a long document.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/github_sticky_editor_header.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/github_sticky_editor_header.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://github.githubassets.com/pinned-octocat.svg
// @grant          GM.addStyle
// @grant          GM_addStyle
// @run-at         document-idle
// ==/UserScript==

(function(){
	"use strict";

	// Prefer asychronous Greasemonkey4-API GM.addStyle, but allow use of GM_addStyle as a fallback if necessary.
	if (typeof GM === 'undefined'){
		this.GM = {};
	}
	if (GM['addStyle'] === undefined){
		console.log('GM.addStyle is not defined. Falling back to GM_addStyle Promise.');
		GM['addStyle'] = function(...args){
			return new Promise((onResolve, onReject) => {
				try{ onResolve(GM_addStyle.apply(this, args)); }
				catch(err){ onReject(err); }
			});
		}
	}

	GM.addStyle(`
		.js-code-editor.container-preview > .file-header {
			top: 0%;
			z-index: 100;
			position: sticky;
		}
   `);
})();
