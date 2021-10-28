// ==UserScript==
// @name        Wider Google Form Fields
// @namespace   https://github.com/StaticPH
// @match       https://docs.google.com/forms/*
// @version     1.0
// @createdAt   10/6/2021, 1:34:35 PM
// @author      StaticPH
// @description Widens the input fields in google forms from 50% to 100% of the question element (minus padding)
// @license     MIT
// @updateURL   https://raw.githubusercontent.com/StaticPH/Userscripts/master/wider_google_form_fields.user.js
// @downloadURL https://raw.githubusercontent.com/StaticPH/Userscripts/master/wider_google_form_fields.user.js
// @homepageURL https://github.com/StaticPH/UserScripts
// @supportURL  https://github.com/StaticPH/UserScripts/issues
// @icon        https://ssl.gstatic.com/docs/spreadsheets/forms/favicon_qp2.png
// @grant       GM.addStyle
// @grant       GM_addStyle
// @noframes
// @run-at      document-start
// ==/UserScript==

(function(){
	"use strict";
	if (!(GM && GM.addStyle)){
		console.log('GM.addStyle is not defined. Falling back to GM_addStyle.');
		GM = GM ? GM : {};
		GM.addStyle = GM.addStyle ? GM.addStyle : GM_addStyle;
	}
	GM.addStyle(`
	.freebirdFormviewerComponentsQuestionTextShort.freebirdFormviewerComponentsQuestionTextTextInput{
		width: 100%;
	}
	`);
})();
