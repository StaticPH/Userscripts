// ==UserScript==
// @name        Hide YouTube Overlay Ads
// @namespace   https://github.com/StaticPH
// @include     /^https?://(www\.)?youtube\.com/watch/.*/
// @include     /^https?:\/\/(www\.)?youtube\.com\/watch\?v=.*/
// @version     1.0
// @author      StaticPH
// @description Hides away pesky overlay ads from your YouTube videos
// @license     MIT
// @updateURL   https://raw.githubusercontent.com/StaticPH/Userscripts/master/hide_youtube_overlay_ads.user.js
// @downloadURL https://raw.githubusercontent.com/StaticPH/Userscripts/master/hide_youtube_overlay_ads.user.js
// @homepageURL https://github.com/StaticPH/UserScripts
// @supportURL  https://github.com/StaticPH/UserScripts/issues
// @icon        https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1280px-YouTube_full-color_icon_%282017%29.svg.png
// @grant       GM.addStyle
// @grant       GM_addStyle
// ==/UserScript==

(function(){
	'use strict';
	// console.debug('Attempting to hide obnoxious overlay ads from your video.');
	GM.addStyle(`
		div.ytp-ad-overlay-slot { display:none; }
	`);
	// console.debug('Pesky overlay ads should now be hidden.');
})();