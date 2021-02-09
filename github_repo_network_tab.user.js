// ==UserScript==
// @name        Github Repo Network Tab
// @namespace   https://github.com/StaticPH
// @match       http*://github.com/*/*
// include     /^https?:\/\/github\.com\/.*\/.*\/
// @version     1.1
// @author      StaticPH
// @description Adds a navigation tab for faster access to the 'Network' page of a repository.
// @license     MIT
// @updateURL   https://raw.githubusercontent.com/StaticPH/Userscripts/master/github_repo_network_tab.user.js
// @downloadURL https://raw.githubusercontent.com/StaticPH/Userscripts/master/github_repo_network_tab.user.js
// @homepageURL https://github.com/StaticPH/UserScripts
// @supportURL  https://github.com/StaticPH/UserScripts/issues
// @icon        https://github.githubassets.com/pinned-octocat.svg
// ==/UserScript==

(function(){
	'use strict';

	/* Determine what repository we are looking at */
	let here = (function getRepoAddress(){
		return location.href.split('/',5).slice(-2).join('/');
	})();

	/* Honestly, I feel like creating the HTML directly is less of a hassle than creating all the elements with JavaScript */
	function createBigNetworkTabHTML(){
		return 	'<span itemscope="" itemtype="http://schema.org/ListItem" itemprop="itemListElement">\n' +
				'	<div class="d-inline">\n' +
				'		<a class="js-selected-navigation-item reponav-item" itemprop="url" data-selected-links="repo_network /' + here + '/network" href="/' + here + '/network">\n' +
				'			<svg class="octicon octicon-forked" xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" aria-hidden="true">\n' +
				'				<path fill-rule="evenodd" d="M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"/>\n' +
				'			</svg>\n' +
				'		Network\n' +
				'		</a>\n' +
				'	</div>\n' +
				'</span>';
	}

	/* Used when the window size is small enough that the repository header gets combined with the site header */
	function createSmallNetworkTabHTML(){
		return	'<a class="js-selected-navigation-item reponav-item" data-selected-links="repo_network /' + here + '/network" href="/' + here + '/network">\n' +
				'	Network\n' +
				'</a>';
	}

	/* Find 'Pull Requests' tab and insert new tab immediately after it, ensuring consistent placement */
	function querySelectorAllContaining(...str){
		return document.querySelectorAll(
			str.map( (sel) => '[data-selected-links*="' + sel + '"]' )
		);
	}

	setTimeout(function wait(){
		const repoTab = querySelectorAllContaining('repo_pulls');
		// Wait until the page loads in enough to have the Pull Request tab in the repository header, so that it can be used as a point of reference for element insertion
		if (repoTab){
			console.debug('Adding big Network tab.');
			repoTab[0].parentNode.insertAdjacentHTML('afterend', createBigNetworkTabHTML());

			try{
				console.debug('Adding small Network tab.');
				repoTab[1].parentNode.insertAdjacentHTML('afterend', createSmallNetworkTabHTML());
			}
			catch{};// ignore failure
			
//			setTimeout(function foo(){
//				if (document.querySelector('[data-selected-links*="repo_network"]')){
//					console.log("Yup, still there");
//				} 
//				// I don't know what causes the element to get deleted sometimes, and I don't know why the developer console doesnt update when 
//				// navigating to another (or the current) tab under whatever condition causes the former (but fixes itself if the page is refreshed)
//			}, 400);
			
		}
		else{
			console.log("Waiting 300ms for page to load further");
			setTimeout(wait, 300);
		}
	});
})();