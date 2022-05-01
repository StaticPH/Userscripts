// ==UserScript==
// @name        YouTube Channel Keyboard Protector
// @namespace   https://github.com/StaticPH
// @include     /^https?:\/\/(www\.)?youtube\.com\/(user|c(hannel)?)\/[^/]+(\/)?/
// @include     /^https?:\/\/(www\.)?youtube\.com\/(user|c(hannel)?)\/[^/]+\/(featured|videos|playlists|community|channels|about)(\/.*|\?.+)?/
// @version     1.1
// @createdAt   11/13/2021, 12:12:07 PM
// @author      StaticPH
// @description Prevents YouTube from hijacking the Up/Down arrow keys on channel pages, as it likes to do sometimes (Left and Right arrow keys are okay though, because those don't control page scrolling).
// @license     MIT
// @updateURL   https://raw.githubusercontent.com/StaticPH/Userscripts/master/youtube_channel_keyboard_protector.user.js
// @downloadURL https://raw.githubusercontent.com/StaticPH/Userscripts/master/youtube_channel_keyboard_protector.user.js
// @homepageURL https://github.com/StaticPH/UserScripts
// @supportURL  https://github.com/StaticPH/UserScripts/issues
// @icon        https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1280px-YouTube_full-color_icon_%282017%29.svg.png
// @grant       none
// @run-at      document-start
// @noframes
// ==/UserScript==

(function(){
	"use strict";

	var protectKeyboard = function(e){
		switch(e.keyCode){
			case 38: // Arrow Up
			case 40: // Arrow Down
				e.stopImmediatePropagation();
				return;
		}
	};

	document.addEventListener('keydown', protectKeyboard, true);
	console.log(`${GM_info.script.name} is working hard to protect your up and down arrow keys from theft.`);
})();
