// ==UserScript==
// @name           Simple URL Tracker Cleaner
// @namespace      https://github.com/StaticPH
// @match          *://*/*
// @version        1.4
// @createdAt      8/10/2021
// @author         StaticPH
// @description    Scrub various common tracker parameters from URLs.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/simple_url_tracker_cleaner.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/simple_url_tracker_cleaner.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://cdn-icons-png.flaticon.com/32/185/185441.png
// @grant          none
// @run-at         document-end
// ==/UserScript==
// Icon from https://www.flaticon.com/free-icon/fly-swatter_185441; All rights belong to their original owner(s).

(function(){
	'use strict';

	async function cleanURLs(){
		Array.from(document.links).forEach(async function(link){
			let fixed = null;
			if (link.href.match(/google\.[^/]+\/url\?.*/)){
				const url = new URL(link.href);
				if (url.searchParams.has('url')){
					fixed = url.searchParams.get('url');
					if (!fixed || fixed.length === 0){ console.warn('Found empty "url" parameter in link: ' + link.href); }
					else{
						console.log( link.href + ' --> ' + fixed );
						link.href = fixed;
					}
				}
				else {
					console.warn('Could not find expected "url" parameter for link:  ' + link.href);
				}
			}
			if (link.href.match(/(?:[?&])(amp;)?(utm_(source|medium|campaign|term|content)|(fb|g)clid)=[^&?#]*[&?#]?/)){
				fixed = link.href.replace(/(?:[?&])(amp;)?(utm_(source|medium|campaign|term|content)|(fb|g)clid)=[^&?#]*/g, '').replace(/[?&]*#/, '#').replace(/[?&]*$/, '');
				console.log( link.href + ' --> ' + fixed );
				link.href = fixed;
			}
			// if (link.href.match(/google\.[^/]+\/search\?q=.+/)){
			if (link.href.match(/google\.[^/]+\/search\?q=.*?\&(ei|sa|ved|bi[wh]|spell|oq|gs_lcp|sclient|uact)=[^&?#]*/)){
				fixed = link.href.replace(/\&(ei|sa|ved|bi[wh]|spell|oq|gs_lcp|sclient|uact)=[^&?#]*/g, '');
				console.log( link.href + ' --> ' + fixed );
				link.href = fixed;
			}
			// TODO: AMAZON URLS
			// On Amazon product pages in particular, you can remove keywords, ref, dchild, pd*, pf*, qid, and sr
			if (link.href.match(/amazon\.[^/]+\/[^/]+\/dp\/[^/]+\/[^?&]+[?&]/)){
				fixed = link.href.replace(/[&?].+$/, '');
				console.log( link.href + ' --> ' + fixed );
				link.href = fixed;
			}
		});
		return;
	}

	cleanURLs();
	setInterval(cleanURLs, 5000);
	// Apparently calling `cleanURLs()` in the setInterval call violates CSP on google pages, because something decides to try interpreting a simple string as javascript.

})();
