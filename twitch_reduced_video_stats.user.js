// ==UserScript==
// @name             Twitch Reduced Video Stats
// @namespace        https://github.com/StaticPH
// @match            https://www.twitch.tv/*
// @match            https://www.twitch.tv/moderator/*
// @match            https://www.twitch.tv/popout/*
// @match            https://www.twitch.tv/videos/*
// @exclude-match    https://www.twitch.tv/videos
// @exclude-match    https://www.twitch.tv/directory*
// @exclude-match    https://www.twitch.tv/p/*
// @exclude-match    https://www.twitch.tv/downloads*
// @exclude-match    https://www.twitch.tv/jobs*
// @exclude-match    https://www.twitch.tv/settings*
// @exclude-match    https://www.twitch.tv/turbo*
// @exclude-match    https://www.twitch.tv/annual-recap
// @version          1.0.0
// @createdAt        12/29/2025, 9:28:53 PM
// @author           StaticPH
// @description      Hides rows that don't really change from the video stats overlay.
// @license          MIT
// @updateURL        https://raw.githubusercontent.com/StaticPH/Userscripts/master/twitch_reduced_video_stats.user.js
// @downloadURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/twitch_reduced_video_stats.user.js
// @homepageURL      https://github.com/StaticPH/UserScripts
// @supportURL       https://github.com/StaticPH/UserScripts/issues
// @icon             https://brand.twitch.tv/assets/logos/svg/glitch/purple.svg
// @grant            GM.addStyle
// @grant            GM_addStyle
// @run-at           document-end
// ==/UserScript==

(function(){
	'use strict';

	// Prefer asychronous Greasemonkey4-API GM.addStyle, but allow use of GM_addStyle as a fallback if necessary.
	if (typeof GM === 'undefined'){
		this.GM = {};
	}
	if (GM['addStyle'] === undefined){
		console.log('GM.addStyle is not defined. Falling back to GM_addStyle Promise.');
		GM['addStyle'] = function(...args){
			return new Promise((onResolve, onReject) => {
				try{ onResolve(GM_addStyle.apply(this, args)); }
				catch(err){ onReject(err); }
			});
		}
	}

	GM.addStyle(`
		/* Hide the first three and last 7 rows.
		That should leave only the Download Bitrate,
		Bandwidth Estimate, FPS (when applicable),
		Skipped Frames, Buffer Size, and
		Latency To Broadcaster */
		[data-a-target="player-overlay-video-stats-row"]:nth-of-type(-n+3),
		[data-a-target="player-overlay-video-stats-row"]:nth-last-of-type(-n+7) {
			display: none;
		}
	`);
})();
