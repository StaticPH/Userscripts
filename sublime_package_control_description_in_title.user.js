// ==UserScript==
// @name           Sublime Package Control Description in Title
// @namespace      https://github.com/StaticPH
// @match          *://packagecontrol.io/packages/*
// @version        1.0.0
// @createdAt      1/23/2024, 9:46:19 AM
// @author         StaticPH
// @description    When browsing Sublime Text plugins on Package Control, it can be useful to include plugin descriptions in the page title. If a description is provided for the currently viewed plugin, do just that.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/sublime_package_control_description_in_title.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/sublime_package_control_description_in_title.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon
// @grant          none
// @noframes
// @run-at         document-load
// ==/UserScript==

(function(){
	"use strict";

	(function waitForDescription(){
		const descriptionEle = document.querySelector('.description');
		if (!descriptionEle){
			setTimeout(waitForDescription, 300);
		}
		else if (descriptionEle.textContent.trim() !== 'No description provided'){
			document.title = document.title + ' | ' + descriptionEle.textContent.trim();
		}
		else{
			// As a fallback, try using the first text from the readme that isn't already part of the title.
			const readmeContents = document.querySelector('.contents > div');
			if (!readmeContents){
				// Couldn't find the readme contents, but that's okay; it isn't that important anyways, so just give up and keep the default title.
				return;
			}
			const prospectiveDescription = Array.prototype.map.call(readmeContents.childNodes, child => child.textContent.trim())
						   .filter(str => str.length !== 0)
						   .find(str => ! document.title.includes(str));
			if (prospectiveDescription){
				document.title = document.title + ' | ' + prospectiveDescription;
			}
		}
	})();

})();

