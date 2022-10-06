// ==UserScript==
// @name          Twitch Transparent Video Stats
// @namespace     https://github.com/StaticPH
// @match         https://www.twitch.tv/*
// @match         https://www.twitch.tv/moderator/*
// @match         https://www.twitch.tv/popout/*
// @match         https://www.twitch.tv/videos/*
// @exclude-match https://www.twitch.tv/videos
// @exclude-match https://www.twitch.tv/directory*
// @exclude-match https://www.twitch.tv/p/*
// @exclude-match https://www.twitch.tv/downloads*
// @exclude-match https://www.twitch.tv/jobs*
// @exclude-match https://www.twitch.tv/settings*
// @exclude-match https://www.twitch.tv/turbo*
// @version       1.1
// @createdAt     5/19/2021
// @author        StaticPH
// @description   Makes the video stats overlay 50% transparent
// @license       MIT
// @updateURL     https://raw.githubusercontent.com/StaticPH/Userscripts/master/twitch_transparent_video_stats.user.js
// @downloadURL   https://raw.githubusercontent.com/StaticPH/Userscripts/master/twitch_transparent_video_stats.user.js
// @homepageURL   https://github.com/StaticPH/UserScripts
// @supportURL    https://github.com/StaticPH/UserScripts/issues
// @icon          https://brand.twitch.tv/assets/logos/svg/glitch/purple.svg
// @grant         GM.addStyle
// @grant         GM_addStyle
// @run-at        document-start
// ==/UserScript==

(function(){
	'use strict';

	// Prefer asychronous Greasemonkey4-API GM.addStyle, but allow use of GM_addStyle as a fallback if necessary.
	if (typeof GM == 'undefined'){
		this.GM = {};
	}
	if (typeof GM['addStyle'] == 'undefined'){
		console.log('GM.addStyle is not defined. Falling back to GM_addStyle Promise.');
		GM['addStyle'] = function(...args){
			return new Promise((onResolve, onReject) => {
				try{ onResolve(GM_addStyle.apply(this, args)); }
				catch(err){ onReject(err); }
			});
		}
	}
	
	GM.addStyle(`
		div.video-player__overlay div.simplebar-scroll-content > div.simplebar-content > div {
			opacity: 0.5;
		}
	`);
})();
