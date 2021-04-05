// ==UserScript==
// @name        Roll20 Character Sheet No Scrolling Number Fields
// @namespace   https://github.com/StaticPH
// @match       http*://app.roll20.net/editor/
// @match       http*://app.roll20.net/editor/popout
// @version     1.0
// @author      StaticPH
// @description This should disable changing the value of any numeric fields on Roll20 character sheets by scrolling
// @license     MIT
// @updateURL   https://raw.githubusercontent.com/StaticPH/Userscripts/master/roll20_character_sheet_no_scrolling_number_fields.user.js
// @downloadURL https://raw.githubusercontent.com/StaticPH/Userscripts/master/roll20_character_sheet_no_scrolling_number_fields.user.js
// @homepageURL https://github.com/StaticPH/UserScripts
// @supportURL  https://github.com/StaticPH/UserScripts/issues
// @icon        https://app.roll20.net/favicon.ico
// @grant       none
// @run-at      document-end
// ==/UserScript==


(function(){
	'use strict';
	//TODO: MUTATION OBSERVERS!!!
// 	var classObserverCallback = function(mutations){
// 	  for(let mutation of mutations){
// 		const classes = mutation.target.classList;

// 		if (classes.contains("right-column")){
// 		  document.body.classList.toggle("ttc-theatre", classes.contains("right-column--theatre"));
// 		  document.body.classList.toggle("ttc-rcol-collapsed", classes.contains("right-column--collapsed"));
// 		}
// 	  }
// 	};

// 	var classObserver = new MutationObserver(classObserverCallback);

// 	function setupClassHelpers(){
// 	  const col = document.querySelector(".right-column");

// 	  if (!col){
// 		return false;
// 	  }

// 	  classObserver.observe(col, { attributes: true, attributeFilter: [ "class" ] });

// 	  classObserverCallback([
// 		{ target: col }
// 	  ]);

// 	  return true;
// 	}
	
    setInterval(() => {
		document.querySelectorAll(
			'div.sheet-hp > input[type="number"] , div.sheet-spell-level > div.sheet-expended > input[type="number"] , ' +
			'div.sheet-page.sheet-options div.sheet-row > input[type="number"][name="attr_default_critical_range"] , ' +
			'div.sheet-row > input.sheet-class-level[type="number"] , ' +
			'div.sheet-hdice-dsaves-container.sheet-old-hit-dice > div.sheet-subcontainer > input[type="number"] , ' +
			'div.sheet-resources > div.sheet-hdice-dsaves-container > div.sheet-subcontainer > input[type="number"] , ' +
			'div.repitem > div.sheet-hdice-dsaves-container > div.sheet-subcontainer > input[type="number"]'
		).forEach(function(field){
			field.onmousewheel = ()=>{return false;};
			field.onwheel = ()=>{return false;};
			console.log(field.name);
		});
    }, 3000);

})();
