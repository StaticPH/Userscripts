// ==UserScript==
// @name        Foxaholic Fixes
// @namespace   https://github.com/StaticPH
// @match       https://www.foxaholic.com/*/*/*/
// @match       https://www.foxaholic.com/*/*/
// @match       https://www.foxaholic.com/*/
// @match       https://18.foxaholic.com/*/*/*/
// @match       https://18.foxaholic.com/*/*/
// @match       https://18.foxaholic.com/*/
// @version     1.0
// @author      StaticPH
// @description Fix Foxaholic's deliberate breaking of context menus, keypresses, and text selection
// @license     MIT
// @updateURL   https://raw.githubusercontent.com/StaticPH/Userscripts/master/foxaholic_fixes.user.js
// @downloadURL https://raw.githubusercontent.com/StaticPH/Userscripts/master/foxaholic_fixes.user.js
// @homepageURL https://github.com/StaticPH/UserScripts
// @supportURL  https://github.com/StaticPH/UserScripts/issues
// @icon        https://www.foxaholic.com/wp-content/uploads/2019/12/cropped-foxaholic-logo-192x192.png
// @grant       none
// @run-at      
// ==/UserScript==

(function(){
	"use strict";

	document.body.removeAttribute('oncontextmenu');
	document.body.removeAttribute('onselectstart');
	document.body.removeAttribute('onkeydown');
	
	// Just some cleanup
	document.querySelectorAll('.foxaholic-publift-desk_footer_sticky, [data-fuse]').forEach(ele=>ele.remove());

})();
