// ==UserScript==
// @name           Google Search Lean Query Updates
// @namespace      https://github.com/StaticPH
// @match          https://www.google.com/search
// @version        1.0
// @createdAt      7/12/2023, 2:08:47 PM
// @author         StaticPH
// @description    Proof-of-concept: Prevent modifications to the Google search query in the on-page search bar from inserting a bunch of unwanted parameters into the resulting URL.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/google_search_lean_query_updates.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/google_search_lean_query_updates.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_48dp.png
// @grant          none
// @run-at         document-start
// @noframes
// ==/UserScript==

(function(){
    "use strict";

    function enterHandler(evnt){
        if (evnt.key === 'Enter' && evnt.target.matches('textarea[name="q"]')){
            evnt.preventDefault();
            evnt.stopImmediatePropagation();
            evnt.stopPropagation();
            document.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(evnt.target.value).replaceAll('%20', '+');
        }
    }
    document.addEventListener('keydown', enterHandler);
})();