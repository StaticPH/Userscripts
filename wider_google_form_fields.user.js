// ==UserScript==
// @name        Wider Google Form Fields
// @namespace   https://github.com/StaticPH
// @match       https://docs.google.com/forms/*
// @version     1.1
// @createdAt   9/30/2021, 1:34:35 PM
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
	.freebirdFormviewerComponentsQuestionTextShort.freebirdFormviewerComponentsQuestionTextTextInput{
		width: 100%;
	}
	`);
})();
