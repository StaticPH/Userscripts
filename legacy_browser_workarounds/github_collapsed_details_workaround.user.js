// ==UserScript==
// @name           GitHub Collapsed Details Legacy Workaround
// @namespace      https://github.com/StaticPH
// @match          https://github.com/*/*
// @version        1.2
// @createdAt      9/30/2022, 9:32:58 PM
// @author         StaticPH
// @description    Add simple onclick handlers to the collapsed details of commits on GitHub, as the normal behavior of expanding the ellipses to the full commit message when clicked seems to have broken on legacy browsers as a result of some change to the implementation. Also fixes some other instances of non-functioning collapsing elements.
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
	const urlRelativeToRepoDefault = '/' + document.location.pathname.split('/').slice(3).join('/');
	const parser = new DOMParser();
	const requestTemplateHTML = {
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


	function toggleShowDetails(evnt){
		// let commitRow = evnt.target.closest('.Details').querySelector('p+*');
		let commitRow = evnt.target.closest('.Details').querySelector('.Details-content--hidden, .Details-content--on') || evnt.target.closest('.Details').querySelector('.text-small').parentElement;
		commitRow.classList.toggle('Details-content--hidden');
		hasRefinedGithub && commitRow.closest('.rgh-dim-bot').classList.toggle('Details--on');
	}

	document.querySelectorAll('.hidden-text-expander > button.ellipsis-expander.js-details-target').forEach(expander => expander.onclick = toggleShowDetails);

	if (urlRelativeToRepoDefault.startsWith('/wiki')){
		// Fix collapsed categories on wiki page sidebar.
		document.querySelectorAll('[data-view-component] include-fragment[loading="lazy"][src]:not([src=""])').forEach(async function(lazyPageFrag){
			try{
				await fetch(lazyPageFrag.getAttribute('src'), requestTemplateHTML).then(
					resp => resp.text().then(
						async function(html){
							await lazyPageFrag.replaceChildren(...parser.parseFromString(html, 'text/html').querySelectorAll('body > ul'));
							await lazyPageFrag.querySelectorAll('[data-analytics-event]').forEach(e => e.removeAttribute('data-analytics-event'));
						},
						err => console.warn('There was a problem retrieving the response text', err)
					),
					err => console.warn('Call to fetch yielded a rejected Promise.', err)
				);
			}
			catch(err){ console.warn(err); } // In the event that any individual fetch call-chain has trouble, just print a warning and continue to finish any remaining fetch quests.
		});
	}
	else if (urlRelativeToRepoDefault.startsWith('/actions/runs')){
		// Fix "Show more"/"Show less" buttons on job run annotations
		const selectorToggleFullAnnotationMessage = 'annotation-message > div > div > [data-action="click:annotation-message#toggleExpansion"]';
		const selectorAnnotationBody = '[data-target="annotation-message.annotationContainer"]';
		const selectorAnnotationBodyAlternative = '.annotation--contracted, .annotation--expanded';

		function onToggleFullAnnotationBody(evnt){
			// Return early if the event target isn't relevant, i.e. not a "Show more"/"Show less" button on a job run annotation.
			if (!evnt.target.matches(selectorToggleFullAnnotationMessage)){ return; }
			const annotationBody = evnt.target.parentElement.querySelector(selectorAnnotationBody) || evnt.target.parentElement.querySelector(selectorAnnotationBodyAlternative);
			if (!annotationBody){
				// Print a warning to the console.
				// Doesn't mention the alternative selector because "annotation--expanded" is just an arbitrarily chosen string,
				// and doesn't necessarily match the normal behavior.
				console.warn('Expected annotation-message to contain a child with the "data-target" attribute set to "annotation-message.annotationContainer"');
				return;
			}
			if (annotationBody.classList.contains('annotation--contracted')){
				annotationBody.classList.replace('annotation--contracted', 'annotation--expanded');
				evnt.target.toggleAttribute('hidden');
				evnt.target.parentElement.querySelector('[data-target="annotation-message.showLessButton"]').toggleAttribute('hidden');
			}
			else { // Normally implies that classList contains 'annotation--expanded'
				// replace 'annotation--expanded' with 'annotation--contracted' if the former exists, otherwise just add the latter;
				// the second case is a fallback in case the class was previously just removed entirely, rather than replaced.
				annotationBody.classList.replace('annotation--expanded', 'annotation--contracted') || annotationBody.classList.add('annotation--contracted');
				evnt.target.toggleAttribute('hidden');
				evnt.target.parentElement.querySelector('[data-target="annotation-message.showMoreButton"]').toggleAttribute('hidden');
			}
		}
		// Add global (document) scoped event listener for click events.
		document.addEventListener('click', onToggleFullAnnotationBody);
	}
})();
