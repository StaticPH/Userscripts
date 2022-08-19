// ==UserScript==
// @name          Github Repo Network Tab
// @namespace     https://github.com/StaticPH
// @match         https://github.com/*/*
// @exclude-match https://github.com/*/*/search*
// @exclude-match https://github.com/about*
// @exclude-match https://github.com/contact*
// @exclude-match https://github.com/customer-stories*
// @exclude-match https://github.com/enterprise*
// @exclude-match https://github.com/explore*
// @exclude-match https://github.com/features*
// @exclude-match https://github.com/marketplace*
// @exclude-match https://github.com/new*
// @exclude-match https://github.com/notifications*
// @exclude-match https://github.com/pricing*
// @exclude-match https://github.com/search*
// @exclude-match https://github.com/security*
// @exclude-match https://github.com/settings/*
// @exclude-match https://github.com/team*
// @exclude-match https://github.com/topics*
// @exclude-match https://github.com/trending*
// @exclude-match https://github.com/users/*/projects/*
// @version       1.6
// @createdAt     4/06/2020
// @author        StaticPH
// @description   Adds a navigation tab for faster access to the 'Network' page of a repository.
// @license       MIT
// @updateURL     https://raw.githubusercontent.com/StaticPH/Userscripts/master/github_repo_network_tab.user.js
// @downloadURL   https://raw.githubusercontent.com/StaticPH/Userscripts/master/github_repo_network_tab.user.js
// @homepageURL   https://github.com/StaticPH/UserScripts
// @supportURL    https://github.com/StaticPH/UserScripts/issues
// @icon          https://github.githubassets.com/pinned-octocat.svg
// ==/UserScript==

(function(){
	'use strict';

	/* Determine what repository we are looking at */
	let here = (function getRepoAddress(){
		return location.href.split('/', 5).slice(-2).join('/');
	})();

	/* Honestly, I feel like creating the HTML directly is less of a hassle than creating all the elements with JavaScript */
	function createBigNetworkTabHTML(){
		// Exclude analytical "data-ga-click" and "data-selected-links" attributes
		return 	'<a class="js-selected-navigation-item UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item" data-tab-item="i2_1network-tab" href="/' + here + '/network" id="bigNetworkTab">\n' +
				'	<svg class="octicon octicon-forked UnderlineNav-octicon d-none d-sm-inline" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 10 16" width="10" aria-hidden="true">\n' +
				'		<path fill-rule="evenodd" d="M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"/>\n' +
				'	</svg>\n' +
				'	<span data-content="Network">\n' +
				// '		::before\n' +
				'		Network\n' +
				'	</span">\n' +
				'</a>\n';
				//TODO: Intelligently determine if the <a> link element should have 'style="visibility:hidden;"' to start with?
	}

	/* Used when the window size is small enough that the repository header gets combined with the site header */
	function createSmallNetworkTabHTML(){
		// This function may not be useful following one of the github ui refreshes since it was first implemented; Leaving it here for now.
		// Exclude analytical "data-ga-click" and "data-selected-links" attributes
		return	'<a class="js-selected-navigation-item reponav-item" href="/' + here + '/network" id="smallNetworkTab">\n' +
				'	Network\n' +
				'</a>';
	}

	//TODO: Intelligently determine if the list element should be hidden when first added
	function createNetworkTabInDropdownHTML(){
		// Exclude analytical "data-ga-click" and "data-selected-links" attributes
		return	'<li data-menu-item="i2_1network-tab" id="networkTabDropdown">\n' +
				'	<a role="menu-item" class="js-selected-navigation-item dropdown-item" href="/' + here + '/network">\n' +
				'		Network\n' +
				'	</a>\n' +
				'<li>';
	}

	/* Find 'Pull Requests' tab and insert new tab immediately after it, ensuring consistent placement */
	function querySelectorAllContaining(...str){
		return document.querySelectorAll(
			str.map( (sel) => '[data-selected-links*="' + sel + '"]' )
		);
	}

	//TODO: Consider insertion at Nth element position, rather than relative to PR tab.
	setTimeout(function wait(){
		const repoPullsTab = querySelectorAllContaining('repo_pulls');
		const dropdownRetryLimit = 5;
		let dropdownRetries = 0;

		// Wait until the page loads in enough to have the Pull Request tab in the repository header, so that it can be used as a point of reference for element insertion
		if (repoPullsTab){
			repoPullsTab[0].insertAdjacentHTML('afterend', createBigNetworkTabHTML());
			document.getElementById('bigNetworkTab') && console.debug('Added big Network tab.');

			try{
				repoPullsTab[1].insertAdjacentHTML('afterend', createSmallNetworkTabHTML());
				document.getElementById('smallNetworkTab') && console.debug('Added small Network tab.');
			}
			catch{};// ignore failure

//			setTimeout(function foo(){
//				if (document.querySelector('[data-selected-links*="repo_network"]')){
//					console.log("Yup, still there");
//				}
//				// I don't know what causes the element to get deleted sometimes, and I don't know why the developer console doesnt update when
//				// navigating to another (or the current) tab under whatever condition causes the former (but fixes itself if the page is refreshed).
//				// This is immensely bothersome, but I have no idea how to fix it short of just checking every few seconds and adding it if not found.
//			}, 400);
// TODO: MutationObservers don't exactly lend themselves to watching for the creation of a specific element that doesn't already exist at some point in time. Find an alternative.

			setTimeout(function waitmore(){
				const pullsDropdownItem = document.querySelector('details-menu li[data-menu-item="i2pull-requests-tab"]');
				if (pullsDropdownItem){
					pullsDropdownItem.insertAdjacentHTML('afterend', createNetworkTabInDropdownHTML());
					document.getElementById('networkTabDropdown') && console.debug('Added Network tab item to dropdown.');
				}
				else if (dropdownRetries >= dropdownRetryLimit){
					console.log(`Number of attempts at adding Network tab to dropdown have exceeded the limit of ${dropdownRetryLimit} attempts. Giving up.`);
				}
				else{
					console.log(`Waiting ${(dropdownRetries * 500) + 500}ms for page to load further before attempting insertion of dropdown-item.`);
					dropdownRetries++;
					setTimeout(waitmore, (dropdownRetries * 500) + 500);
				}
			});

			if (location.pathname.endsWith(here + '/network') || location.pathname.endsWith(here + '/network/')){
				let networkTab = document.querySelector('[data-tab-item="i2_1network-tab"]');
				let insightsTab = document.querySelector('[data-tab-item="i7insights-tab"]');

				if (insightsTab /*&& insightsTab.hasAttribute('aria-current')*/){
					insightsTab.removeAttribute('aria-current');
					insightsTab.classList.remove('selected');
				}
				if (networkTab){
					networkTab.classList.add('selected');
				}
			}
		}
		else{
			console.log('Waiting 300ms for page to load further.');
			setTimeout(wait, 300);
		}
	});
})();
