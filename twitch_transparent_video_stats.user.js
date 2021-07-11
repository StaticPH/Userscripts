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
// @exclude-match https://www.twitch.tv/turbo*
// @version       1.0
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

	// Prefer using the GM_* methods supported by TamperMonkey, Violentmonkey, and GreaseMonkey < v4
	GM_addStyle(`
		div.video-player__overlay div.simplebar-scroll-content > div.simplebar-content > div {
			opacity: 0.5;
		}
	`);
})();
