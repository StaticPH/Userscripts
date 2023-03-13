// ==UserScript==
// @name           GitHub Lazy Release Assets Legacy Workaround
// @namespace      https://github.com/StaticPH
// @match          https://github.com/*/*/releases*
// @version        1.1
// @createdAt      10/8/2022, 4:40:25 PM
// @author         StaticPH
// @description    Fixes a number of things related to user-downloadable asset files on GitHub for users of legacy browsers.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/legacy_browser_workarounds/github_lazy_release_asset_workaround.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/legacy_browser_workarounds/github_lazy_release_asset_workaround.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://github.githubassets.com/pinned-octocat.svg
// @grant          none
// @noframes
// @run-at         document-end
// ==/UserScript==

/* Extended feature List (TODO: Move to a README somewhere)
	- Fetch asset list for releases, as the code that should already have been responsible for that is too modern, and is thus never even attempted on legacy browsers.
	- Fix the timestamps on the release page(s), most of which are within asset lists.
	- Slightly changes normal behavior by automatically showing all assets for the first release on the page, whether that's two assets or fourty assets.
*/


(function(){
	"use strict";

	const parser = new DOMParser();
	const requestTemplate = {
		'credentials': 'include',
		'headers': {
			'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
			'accept-language': 'en-US,en;q=0.9',
			'upgrade-insecure-requests': '1'
		},
		'referrerPolicy': 'strict-origin-when-cross-origin',
		'body': null,
		'method': 'GET',
		'mode': 'cors'
	};
	const timestampPreset = { month: 'short', year: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
	async function localizeTimestamp(dateObj){
		return await dateObj.toLocaleString(navigator.language, timestampPreset);
	}

	// While on the topic of fixing things, fix all the timestamps on the page that don't seem to want to display.
	// Use the same format as GitHub would be, by utilizing the attributes of the local-time elements.
	async function fixDate(ele){
		// ele.textContent = localizeTimestamp(new Date(ele.getAttribute('datetime')));
		ele.textContent = await new Date(ele.getAttribute('datetime')).toLocaleString(navigator.language, {
			month: ele.getAttribute('month') || undefined,
			day: ele.getAttribute('day') || undefined,
			year: ele.getAttribute('year') || undefined
		});
	}
	document.querySelectorAll('section local-time:first-of-type').forEach(fixDate);

	// Similar to fixDate, but tailored for relative-time rather than local-time
	// FIXME: the format for relative times should probably be different. Check and confirm.
	async function fixTime(ele){
		ele.textContent = await new Date(ele.getAttribute('datetime')).toLocaleString(navigator.language, {
			month: ele.getAttribute('month') || undefined,
			day: ele.getAttribute('day') || undefined,
			year: ele.getAttribute('year') || undefined
		});
	}

	document.querySelectorAll('[data-view-component] include-fragment[loading="lazy"][src]:not([src=""])').forEach(async function(lazyPageFrag){
		try{
			await fetch(lazyPageFrag.getAttribute('src'), requestTemplate).then(
				resp => resp.text().then(
					async function(html){
						await lazyPageFrag.replaceChildren(...parser.parseFromString(html, 'text/html').querySelectorAll('body > [data-view-component]'));
						await lazyPageFrag.querySelectorAll('local-time').forEach(await fixDate);
						await lazyPageFrag.querySelectorAll('relative-time').forEach(await fixTime); // FIXME: the format for relative times should probably be different.
					},
					err => console.warn('There was a problem retrieving the response text', err)
				),
				err => console.warn('Call to fetch yielded a rejected Promise.', err)
			);
		}
		catch(err){ console.warn(err); } // In the event that any individual fetch call-chain has trouble, just print a warning and continue to finish any remaining fetch quests.
	});

	// include-fragment[data-deferred-src]:not([data-deferred-src=""] will also likely have a class js-truncated-assets-fragment
	document.querySelectorAll('include-fragment[data-deferred-src]:not([data-deferred-src=""])').forEach(async function (deferredPageFrag){
		try{
			await fetch(deferredPageFrag.getAttribute('data-deferred-src'), requestTemplate).then(
				resp => resp.text().then(
					async function(html){
						await deferredPageFrag.replaceChildren(...parser.parseFromString(html, 'text/html').querySelectorAll('body > [data-view-component]'));
						await deferredPageFrag.querySelectorAll('local-time').forEach(await fixDate);
						await deferredPageFrag.querySelectorAll('relative-time').forEach(await fixTime); // FIXME: the format for relative times should probably be different.
					},
					err => console.warn('There was a problem retrieving the response text', err)
				),
				err => console.warn('Call to fetch yielded a rejected Promise.', err)
			);
		}
		catch(err){ console.warn(err); } // In the event that any individual fetch call-chain has trouble, just print a warning and continue to finish any remaining fetch quests.
	});

	/*
		Realistically, the above two forEach blocks could be combined in 3 steps:
		1. Replacing all usage of "lazyPageFrag" or "deferredPageFrag" with "delayedPageFrag"
		2. Using a single selector:
			'[data-view-component] include-fragment[loading="lazy"][src]:not([src=""]), include-fragment[data-deferred-src]:not([data-deferred-src=""])'
		3. Combining the first parameters of their fetch calls:
			delayedPageFrag.getAttribute('src') || delayedPageFrag.getAttribute('data-deferred-src')
	*/

	console.info('Proactively fixing lazy loaded and deferred release assets. Consider updating your browser.');
})();
