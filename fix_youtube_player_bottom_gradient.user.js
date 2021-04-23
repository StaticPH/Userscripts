// ==UserScript==
// @name        Fix Youtube Player Bottom Gradient
// @namespace   https://github.com/StaticPH
// @include     /^https?://(www\.)?youtube\.com/watch/.*/
// @include     /^https?:\/\/(www\.)?youtube\.com\/watch\?v=.*/
// @version     1.0
// @author      StaticPH
// @description This "fixes" the excessively large bottom gradient area that sometimes appears on the youtube video player when the mouse cursor is within the player frame. Only observed in Vivaldi so far.
// @license     MIT
// @updateURL   https://raw.githubusercontent.com/StaticPH/Userscripts/master/fix_youtube_player_bottom_gradient.user.js
// @downloadURL https://raw.githubusercontent.com/StaticPH/Userscripts/master/fix_youtube_player_bottom_gradient.user.js
// @homepageURL https://github.com/StaticPH/UserScripts
// @supportURL  https://github.com/StaticPH/UserScripts/issues
// @grant       GM.addStyle
// @grant       GM_addStyle
// @run-at      document-idle
// ==/UserScript==

(function(){
	'use strict';
// 	GM.addStyle(`
// 		div.ytp-gradient-bottom { display:none; }
// /* 		div.ytp-gradient-bottom { z-index:0; } */
// 	`);
	
	setTimeout(function wait(){
		const playerBottomGradient = document.getElementById('movie_player').querySelector('.ytp-gradient-bottom');
		if (playerBottomGradient){
			console.log('Fixing bottom player gradient height');
			playerBottomGradient.style.removeProperty('height');
			return;
		}
		else{
			console.log('Waiting to fix bottom player gradient height');
			setTimeout(wait, 300);
		}
		return;
	});
	
})();
