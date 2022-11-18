// ==UserScript==
// @name           Bypass Blogspot's Blogger IFrame
// @namespace      https://github.com/StaticPH
// @match          *://blogspot.com/*
// @match          *://*.blogspot.com/*
// @match          *://blogger.com/*
// @match          *://*.blogger.com/*
// @version        1.1
// @createdAt      6/2/2021
// @author         StaticPH
// @description    Unhide the page body and hide obstructing iframes on some blogspot pages, which use those methods for reasons like discouraging ad blocking.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/bypass_blogspots_blogger_iframe.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/bypass_blogspots_blogger_iframe.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Blogger.svg/1200px-Blogger.svg.png
// @grant          none
// @run-at         
// ==/UserScript==

(function(){
	'use strict';

	/* Remove the iframe that obscures the entire page far too often. */
	let injectedFrame = document.getElementById('injected-iframe');
	injectedFrame && injectedFrame.remove();

	/*
	   The first child element of body is expected to be a style, which makes all children of body invisible.
	   Re-style all children of the body element to use their initial visibility, by inserting a new style element
	   responsible for that immediately after the existing style element making them invisible is expected to be.
	*/
	document.body.firstElementChild.insertAdjacentHTML('afterEnd', '<style type="text/css">body * { visibility: initial; }</style>');
	console.log('Fixed visibility of body child elements.');
})();
