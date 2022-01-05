// ==UserScript==
// @name          Hide Twitch Channel Leaderboard
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
// @version       1.1
// @createdAt     6/19/2020
// @author        StaticPH
// @description   Hides the stupid channel leaderboard on Twitch.tv
// @icon          https://brand.twitch.tv/assets/logos/svg/glitch/purple.svg
// @license       MIT
// @updateURL     https://raw.githubusercontent.com/StaticPH/Userscripts/master/twitch_hide_channel_leaderboard.user.js
// @downloadURL   https://raw.githubusercontent.com/StaticPH/Userscripts/master/twitch_hide_channel_leaderboard.user.js
// @homepageURL   https://github.com/StaticPH/UserScripts
// @supportURL    https://github.com/StaticPH/UserScripts/issues
// @grant         GM.addStyle
// @grant         GM_addStyle
// @run-at        document-start
// ==/UserScript==

// Prefer using the GM_* methods supported by TamperMonkey, Violentmonkey, and GreaseMonkey < v4
GM_addStyle ( `
    div.channel-leaderboard.tw-z-default {
    	display: none;
    }
`
);
// document.querySelector('div.channel-leaderboard.tw-z-default').hidden=true;
