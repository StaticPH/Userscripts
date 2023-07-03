// ==UserScript==
// @name           Hide Posts By Subreddit
// @namespace      https://github.com/StaticPH
// @match          https://old.reddit.com/*
// @version        1.1
// @createdAt      4/8/2022, 6:34:35 PM
// @author         StaticPH
// @description    Hide posts from arbitrary subreddits. ONLY FOR old.reddit.com!
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/reddit_hide_by_subreddit.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/reddit_hide_by_subreddit.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png
// @grant          GM.setValue
// @grant          GM_setValue
// @grant          GM.getValue
// @grant          GM_getValue
// @grant          GM.addStyle
// @grant          GM_addStyle
// @noframes
// @run-at         document-start
// ==/UserScript==

(function(){
	"use strict";

	const settings = {
		/* An array of names (strings) of subreddits from which posts should be hidden. */
		hideSubredditsNamed: [],
	};

	// Prefer asychronous Greasemonkey4-API GM.* methods, but allow use of GM_* methods as a fallback if necessary.
	if (typeof GM === 'undefined'){
		this.GM = {};
	}
	Object.entries({
		'GM_getValue': 'getValue',
		'GM_setValue': 'setValue',
		'GM_addStyle': 'addStyle'
	}).forEach((gm3Name, gm4Name) => {
		if (GM[gm4Name] === 'undefined'){
			const fallback = this[gm3Name];
			if (!fallback){
				throw new ReferenceError('Unable to find ' + gm3Name + ' to use as fallback for the unavailable GM.' + gm4Name + ' method!');
			}
			console.log('GM.' + gm4Name + ' is not defined. Falling back to ' + gm3Name + ' Promise.');
			GM[gm4Name] = function(...args){
				return new Promise((onResolve, onReject) => {
					try{ onResolve(fallback.apply(this, args)); }
					catch(err){ onReject(err); }
				});
			}
		}
	});

	function readSettings(){
		for(let key in settings){
			settings[key] = GM.getValue(key, settings[key]);
		}
	}

	function saveSettings(){
		for(let key in settings){
			GM.setValue(key, settings[key]);
		}
	}

	readSettings();
	saveSettings();

	if (settings.hideSubredditsNamed.length < 1){
		console.log('No subreddits to hide.');
		return;
	}

	const selectorStrBuilder = (subredditName) => 'div.thing[data-subreddit="' + subredditName + '"]';

	GM.addStyle(Array.from(settings.hideSubredditsNamed, selectorStrBuilder).join(', ') + '{ display: none; }');

})();
