// ==UserScript==
// @name             Better IzzyOnDroid App Titles
// @namespace        https://github.com/StaticPH
// @match            *://apt.izzysoft.de/fdroid/index/apk/*
// @match            *://android.izzysoft.de/repo/apk/*
// @version          1.0.1
// @createdAt        5/2/2024, 5:33:04 PM
// @author           StaticPH
// @description      Adds app description to page titles where possible.
// @license          MIT
// @updateURL        https://raw.githubusercontent.com/StaticPH/Userscripts/master/izzyondroid_description_in_title.user.js
// @downloadURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/izzyondroid_description_in_title.user.js
// @homepageURL      https://github.com/StaticPH/UserScripts
// @supportURL       https://github.com/StaticPH/UserScripts/issues
// @icon             https://apt.izzysoft.de/fdroid/izzy-on-droid.png
// @grant            none
// @run-at           document-end
// @noframes
// ==/UserScript==

(function(){
	"use strict";

	const parts = document.title.split('- IzzyOnDroid');
	const tail = parts.pop();
	let summary = document.getElementById('summary').textContent;
	summary = summary[0].toLocaleUpperCase() + summary.slice(1);
	parts.push('- ' + summary + ' | IzzyOnDroid' + tail);
	document.title = parts.join('');
})();
