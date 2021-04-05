// ==UserScript==
// @name        Centered Gmail Toast Notifications
// @namespace   https://github.com/StaticPH
// @match       https://mail.google.com/mail/*
// @version     1.0
// @author      StaticPH
// @description Do you hate that Gmail shows a toast notification that blocks functional regions of the UI after you do something to any email? Me too! 
// @description This little change should help mitigate the problem.
// @license     MIT
// @updateURL   https://raw.githubusercontent.com/StaticPH/Userscripts/master/centered_gmail_toast_notifications.user.js
// @downloadURL https://raw.githubusercontent.com/StaticPH/Userscripts/master/centered_gmail_toast_notifications.user.js
// @homepageURL https://github.com/StaticPH/UserScripts
// @supportURL  https://github.com/StaticPH/UserScripts/issues
// @icon        https://upload.wikimedia.org/wikipedia/commons/a/ab/Gmail_Icon.svg
// @grant       GM_addStyle
// @run-at      document-idle
// ==/UserScript==

GM_addStyle(`
	div[role=alert] > div > div{
		width: max-content;
		margin-left: 40%!important;
	}
`);
