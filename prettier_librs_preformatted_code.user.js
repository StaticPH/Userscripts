// ==UserScript==
// @name           Prettier preformatted code for lib.rs
// @namespace      https://github.com/StaticPH
// @match          https://lib.rs/crates/*
// @version        1.0
// @createdAt      7/5/2020
// @author         StaticPH
// @description    Makes <pre><code> blocks on lib.rs look more like they do on crates.io; lib.rs is so much faster thanks to reduced JS use, but it's not as pretty.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/prettier_librs_preformatted_code.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/prettier_librs_preformatted_code.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://lib.rs/favicon.png
// @grant          GM_addStyle
// @run-at         document-start
// ==/UserScript==

GM_addStyle(`
	code[lang], pre[lang], :not(p) pre:not(code) {
		color: #fff;
		background: 0 0;
		font-size: 1em;
		/*
		text-align: left;
		text-shadow: 0 -.1em .2em #000;
		white-space: pre;
		word-spacing: normal;
		word-break: normal;
		word-wrap: normal;
		*/
		line-height: 1.5;
	}
	:not(pre)>code[lang], pre[lang], :not(p) pre:not(code) {
		background: #141414;
	}
	pre[lang], :not(p) pre:not(code) {
		border-radius: .5em;
		border: .3em solid #545454;
		/* box-shadow: 1px 1px 0.5em #000 inset; */
		margin: .5em 0;
		/* overflow: auto; */
		padding: 1em;
	}
	:not(pre)>code[lang] {
		border-radius: .3em;
		border: .13em solid #545454;
		/* box-shadow: 1px 1px .3em -.1em #000 inset; */
		padding: .15em .2em .05em;
		white-space: normal
	}
`);

// Only use this if changing the font size from 0.9em to 1em as above results in some code blocks wrapping for just 3-4 characters. Can mess with layout on pages where this is not a problem.
/*
GM_addStyle(`
	#deps {
		max-height: min-content;
	}
	.about-crate {
		min-width: inherit;
	}
	#readme-deps>div {
		min-width: 100%;
	}
	#readme-deps, .about-crate {
		max-width: min-content;
	}
`)
*/



/* Or if it's really necessary:
(function() {
	let css = ` CSS HERE `;
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	}
	else {
		let node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		let heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			heads[0].appendChild(node);
		} else {
			// Somehow, the page doesn't seem to have a <head> yet. As such, just insert this new element wherever you can
			document.documentElement.appendChild(node);
		}
	}
})();
*/
