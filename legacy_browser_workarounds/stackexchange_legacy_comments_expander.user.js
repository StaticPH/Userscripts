// ==UserScript==
// @name           StackExchange Legacy Comments Expander
// @namespace      https://github.com/StaticPH
// @match          https://askubuntu.com/*
// @match          https://serverfault.com/*
// @match          https://superuser.com/*
// @match          https://stackoverflow.com/*
// @match          https://stackexchange.com/*
// @match          https://*.stackoverflow.com/*
// @match          https://*.stackexchange.com/*
// @version        1.1
// @createdAt      11/6/2022, 1:17:14 AM
// @author         StaticPH
// @description    Replace 'Show X more comments' handler for StackExchange sites to better support older browsers; in particular, this enables showing all comments when using Chromium 72.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/legacy_browser_workarounds/stackexchange_legacy_comments_expander.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/legacy_browser_workarounds/stackexchange_legacy_comments_expander.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico
// @grant          none
// @noframes
// @run-at         document-load
// ==/UserScript==

(function(){
	'use strict';

	function replaceChildrenWithNodes(parentNode, ...newChildren){
		while (parentNode.lastChild){
			parentNode.removeChild(parentNode.lastChild);
		}
		if (newChildren !== undefined){
			const replacements = (newChildren.length === 1 && Array.isArray(newChildren[0])) ? newChildren[0] : newChildren;
			parentNode.append(...replacements);
			return true;
		}
		return false;
	}

	async function replaceChildrenWithFetched(parentEle, rawHtml){
		const parser = new DOMParser();
		const responseHtml = parser.parseFromString(rawHtml, 'text/html');
		return replaceChildrenWithNodes(parentEle, ...responseHtml.querySelectorAll('li'));
	}

	function onExpandComments(evnt){
		if (evnt.target.matches('.answer a.js-show-link, .question a.js-show-link')){
			evnt.stopImmediatePropagation();
			evnt.preventDefault();
			const answer = evnt.target.closest('.answer, .question');
			const postID = answer.getAttribute('data-answerid') || answer.getAttribute('data-questionid');
			const insertInto = answer.querySelector('ul.comments-list');
			fetch(document.location.origin + '/posts/' + postID + '/comments', {
			  'headers': {
				'accept': 'text/html, */*; q=0.01',
			  },
			  'referrerPolicy': 'strict-origin-when-cross-origin',
			  'body': null,
			  'method': 'GET',
			  'mode': 'cors',
			  'credentials': 'include'
			}).then(resp => resp.text())
			/*
			  .then(data => replaceChildrenWithFetched(insertInto, data))
			  .then(()=>{
				evnt.target.parentElement.remove();
				insertInto.setAttribute('data-remaining-comments-count', '0');
			  });
			*/
			  .then(data => replaceChildrenWithFetched(insertInto, data) && evnt.target.parentElement.remove(), insertInto.setAttribute('data-remaining-comments-count', '0'));
		}
	}
	document.addEventListener('click', onExpandComments);

})();
