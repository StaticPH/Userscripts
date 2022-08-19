// ==UserScript==
// @name           GitHub Notifications Legacy Workaround
// @namespace      https://github.com/StaticPH
// @match          https://github.com/notifications/beta/archive
// @version        1.0
// @createdAt      7/10/2022, 2:06:39 AM
// @author         StaticPH
// @description    Quick and simple redirect to work around strange behavior of being sent to github.com/notifications/beta/archive when marking notifications as done.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/legacy_browser_workarounds/github_notifications_archive_workaround.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/legacy_browser_workarounds/github_notifications_archive_workaround.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://github.githubassets.com/pinned-octocat.svg
// @grant          none
// @noframes
// @run-at         document-end
// ==/UserScript==

(function(){
	"use strict";

	// history.replaceState(null, 'Notifications', 'https://github.com/notifications') && location.reload(); // strangely, this somehow causes CORS problems.
	location.href = 'https://github.com/notifications';
})();
