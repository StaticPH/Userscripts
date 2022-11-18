// ==UserScript==
// @name           Correct Google Form Correctness
// @namespace      https://github.com/StaticPH
// @match          https://docs.google.com/forms/*
// @version        1.0
// @createdAt      11/9/2021, 9:55:12 AM
// @author         StaticPH
// @description    Fields manually marked correct should appear no differently from fields that exactly matched the preset correct answer.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/correct_google_form_correctness.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/correct_google_form_correctness.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://ssl.gstatic.com/docs/spreadsheets/forms/favicon_qp2.png
// @grant          none
// @noframes
// @run-at         document-end
// ==/UserScript==

(function(){
	const ffvPrefix = 'freebirdFormviewerView';
	const iconPrefix = 'freebirdMaterialIconIcon';

	function actuallyMarkCorrect(elementToFix){
		let correctnessIconDiv = elementToFix.querySelector(`.${ffvPrefix}ItemsItemChoiceCorrectnessIcon`);
		let screenreaderLabel = correctnessIconDiv.querySelector('.screenreaderOnly');
		let iconGroupDiv = correctnessIconDiv.querySelector(`.${iconPrefix}El`);

		correctnessIconDiv.setAttribute(
			'aria-label',
			correctnessIconDiv.getAttribute('aria-label').replace('Incorrect', 'Correct')
		);

		if (screenreaderLabel && screenreaderLabel.textContent){
			screenreaderLabel.textContent.replace('Incorrect', 'Correct');
		}

		iconGroupDiv.querySelector(`.${iconPrefix}DarkIcon`).classList.replace('freebird-qp-icon-clear-b', 'freebird-qp-icon-check-green-b');
		iconGroupDiv.querySelector(`.${iconPrefix}LightIcon`).classList.replace('freebird-qp-icon-clear-w', 'freebird-qp-icon-check-green-w');
		iconGroupDiv.querySelector(`.${iconPrefix}M2Icon`).classList.replace('freebird-qp-icon-clear-red-m2', 'freebird-qp-icon-check-green-m2');

		elementToFix.classList.replace(`${ffvPrefix}ItemsTextIncorrect`, `${ffvPrefix}ItemsTextCorrect`);
	}

	document.querySelectorAll(`div.${ffvPrefix}ItemsItemItemHeader.${ffvPrefix}ItemsItemCorrect`).forEach( fieldHeader => actuallyMarkCorrect(fieldHeader.nextElementSibling) );
})();
