// ==UserScript==
// @name          Github Repo Network Tab
// @namespace     https://github.com/StaticPH
// @match         http*://github.com/*/*
// @exclude-match http*://github.com/marketplace*
// @exclude-match http*://github.com/trending*
// @exclude-match http*://github.com/explore*
// @exclude-match http*://github.com/site*
// @exclude-match http*://github.com/security*
// @exclude-match http*://github.com/contact*
// @exclude-match http*://github.com/pricing*
// @exclude-match http*://github.com/about*
// @exclude-match http*://github.com/notifications*
// @exclude-match http*://github.com/new*
// @exclude-match http*://github.com/organizations*
// @exclude-match http*://github.com/settings/*
// @exclude-match http*://github.com/search*
// @exclude-match http*://github.com/features*
// @exclude-match http*://github.com/team*
// @exclude-match http*://github.com/enterprise*
// @exclude-match http*://github.com/customer-stories*
// @version       1.5
// @author        StaticPH
// @description   Adds a navigation tab for faster access to the 'Network' page of a repository.
// @license       MIT
// @updateURL     https://raw.githubusercontent.com/StaticPH/Userscripts/master/github_repo_network_tab.user.js
// @downloadURL   https://raw.githubusercontent.com/StaticPH/Userscripts/master/github_repo_network_tab.user.js
// @homepageURL   https://github.com/StaticPH/UserScripts
// @supportURL    https://github.com/StaticPH/UserScripts/issues
// icon          https://github.githubassets.com/pinned-octocat.svg
// @icon          data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4xLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzNiAzNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzYgMzYiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMxOTE3MTciIGQ9Ik0xOCwxLjRDOSwxLjQsMS43LDguNywxLjcsMTcuN2MwLDcuMiw0LjcsMTMuMywxMS4xLDE1LjUNCgljMC44LDAuMSwxLjEtMC40LDEuMS0wLjhjMC0wLjQsMC0xLjQsMC0yLjhjLTQuNSwxLTUuNS0yLjItNS41LTIuMmMtMC43LTEuOS0xLjgtMi40LTEuOC0yLjRjLTEuNS0xLDAuMS0xLDAuMS0xDQoJYzEuNiwwLjEsMi41LDEuNywyLjUsMS43YzEuNSwyLjUsMy44LDEuOCw0LjcsMS40YzAuMS0xLjEsMC42LTEuOCwxLTIuMmMtMy42LTAuNC03LjQtMS44LTcuNC04LjFjMC0xLjgsMC42LTMuMiwxLjctNC40DQoJYy0wLjItMC40LTAuNy0yLjEsMC4yLTQuM2MwLDAsMS40LTAuNCw0LjUsMS43YzEuMy0wLjQsMi43LTAuNSw0LjEtMC41YzEuNCwwLDIuOCwwLjIsNC4xLDAuNWMzLjEtMi4xLDQuNS0xLjcsNC41LTEuNw0KCWMwLjksMi4yLDAuMywzLjksMC4yLDQuM2MxLDEuMSwxLjcsMi42LDEuNyw0LjRjMCw2LjMtMy44LDcuNi03LjQsOGMwLjYsMC41LDEuMSwxLjUsMS4xLDNjMCwyLjIsMCwzLjksMCw0LjUNCgljMCwwLjQsMC4zLDAuOSwxLjEsMC44YzYuNS0yLjIsMTEuMS04LjMsMTEuMS0xNS41QzM0LjMsOC43LDI3LDEuNCwxOCwxLjR6Ii8+DQo8L3N2Zz4NCg==
// ==/UserScript==

(function(){
	'use strict';

	/* Determine what repository we are looking at */
	let here = (function getRepoAddress(){
		return location.href.split('/',5).slice(-2).join('/');
	})();

	/* Honestly, I feel like creating the HTML directly is less of a hassle than creating all the elements with JavaScript */
	function createBigNetworkTabHTML(){
		return 	'<a class="js-selected-navigation-item UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item" data-tab-item="i2_1network-tab" data-ga-click="Repository, Navigation click, Network tab" data-selected-links="repo_network /' + here + '/network" href="/' + here + '/network">\n' +
				'	<svg class="octicon octicon-forked UnderlineNav-octicon d-none d-sm-inline" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 10 16" width="10" aria-hidden="true">\n' +
				'		<path fill-rule="evenodd" d="M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"/>\n' +
				'	</svg>\n' +
				'	<span data-content="Network">\n' +
				// '		::before\n' +
				'		Network\n' +
				'	</span">\n' +
				'</a>\n';
				//TODO: intelligently determine if the <a> link element should have 'style="visibility:hidden;"' to start with?
	}

	/* Used when the window size is small enough that the repository header gets combined with the site header */
	function createSmallNetworkTabHTML(){
		// This function may not be useful following one of the github ui refreshes since it was first implemented; Leaving it here for now.
		return	'<a class="js-selected-navigation-item reponav-item" data-selected-links="repo_network /' + here + '/network" href="/' + here + '/network">\n' +
				'	Network\n' +
				'</a>';
	}

	//TODO: Intelligendly determine if the list element should be hidden when first added
	function createNetworkTabInDropdownHTML(){
		return	'<li data-menu-item="i2_1network-tab">\n' +
				// '	<a role="menu-item" class="js-selected-navigation-item dropdown-item" data-selected-links="repo_network /' + here + '/network" href="/' + here + '/network">\n' +
				'	<a role="menu-item" class="js-selected-navigation-item dropdown-item" data-selected-links=" /' + here + '/network" href="/' + here + '/network">\n' +
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

	setTimeout(function wait(){
		const repoPullsTab = querySelectorAllContaining('repo_pulls');
		const dropdownRetryLimit = 5;
		let dropdownRetries = 0;
		
		// Wait until the page loads in enough to have the Pull Request tab in the repository header, so that it can be used as a point of reference for element insertion
		if (repoPullsTab){
			console.debug('Adding big Network tab.');
			repoPullsTab[0].insertAdjacentHTML('afterend', createBigNetworkTabHTML());

			try{
				repoPullsTab[1].insertAdjacentHTML('afterend', createSmallNetworkTabHTML());
				console.debug('Added small Network tab.');
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

			setTimeout(function waitmore(){
				const pullsDropdownItem = document.querySelector('details-menu li[data-menu-item="i2pull-requests-tab"]');
				if (pullsDropdownItem){
					console.debug('Adding Network tab item to dropdown.');
					pullsDropdownItem.insertAdjacentHTML('afterend', createNetworkTabInDropdownHTML());
				}
				else if (dropdownRetries >= dropdownRetryLimit){
					console.log(`Number of attempts to add Network tab to dropdown exceed limit (${dropdownRetryLimit}). Giving up.`);
				}
				else{
					console.log(`Waiting ${(dropdownRetries * 500) + 500}ms for page to load further before attempting insertion of dropdown-item`);
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
			console.log("Waiting 300ms for page to load further");
			setTimeout(wait, 300);
		}
	});
})();
