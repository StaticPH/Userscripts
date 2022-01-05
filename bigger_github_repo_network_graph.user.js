// ==UserScript==
// @name        Bigger Github Repo Network Graph
// @namespace   https://github.com/StaticPH
// @match       http*://github.com/*/*/network
// include     /^https?:\/\/github\.com\/.*\/.*\/network/
// @version     1.0
// @createdAt   4/12/2020
// @author      StaticPH
// @description Makes the timeline on the Network page of Github repositories utilize more of that available whitespace on the sides. Still can't seem to make it use everything on the right though...
// @license     MIT
// @updateURL   https://raw.githubusercontent.com/StaticPH/Userscripts/master/bigger_github_network_graph.user.js
// @downloadURL https://raw.githubusercontent.com/StaticPH/Userscripts/master/bigger_github_network_graph.user.js
// @homepageURL https://github.com/StaticPH/UserScripts
// @supportURL  https://github.com/StaticPH/UserScripts/issues
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @grant       GM.addStyle
// @grant       GM_addStyle
// ==/UserScript==

(function(){
	'use strict';
	
	// console.debug('Un-centering timeline.');	
	GM.addStyle(`
		.new-discussion-timeline { 
			margin-right: unset; 
			margin-left: unset;
			width: auto;
		}
		.container-lg { 
			max-width: none !important;
			margin-left: 0px !important;
		}
		.container-lg.new-discussion-timeline.px-3 > div > div > div.flex-shrink-0.col-3 {
			max-width: fit-content !important;
		}
	`);
	// console.debug('Timeline no longer centered.');
	
})();



// newEntStyle=Array.from(document.querySelector('.network').computedStyleMap().entries());
// newEntStyle.filter((e)=>e[1]!=['']).length;

// newEntStyle=Array.from(document.querySelector('.network').computedStyleMap().entries());
// console.log(...newEntStyle[0])


//gain expandable trait, though it still doesnt apply to the canvas itself
/* document.querySelector('#network > div')
	remove class 'overflow-hidden'
	add attribute 'overflow-x: scroll'
	add attribute 'resize: both' */
	
	
	
/* qp=Array.from(document.querySelectorAll('.container-lg')[2].computedStyleMap()).slice(0,10).filterInPlace((e)=>
	e[1] == 'auto'
)

qp=function(){
	let val = Array.from(document.querySelectorAll('.container-lg')[2].computedStyleMap()).slice(0,10)
	val.forEach( (ele) => console.log('ele[0]=' + ele[0] + '\tele[1]=' + ele[1]) );
	return val;
}();

Array.from(document.querySelectorAll('.container-lg')[2].computedStyleMap()).find(function(e){
	console.log('e[0]='+e[0]+'\te[1]='+e[1]);
	return e[1]=='auto'
})
 */	