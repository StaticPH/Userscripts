// ==UserScript==
// @name           NovelUpdates Reading List Upgrades
// @namespace      https://github.com/StaticPH
// @match          https://www.novelupdates.com/reading-list/
// @version        1.0
// @createdAt      7/28/2022, 4:13:05 PM
// @author         StaticPH
// @description    Allows hiding novels the user is caught up on from their reading lists, adds the current reading list name to the title, and more planned.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/novelupdates_reading_list_upgrades.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/novelupdates_reading_list_upgrades.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           https://www.novelupdates.com/favicon.ico
// @grant          GM.addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @run-at         document-end
// ==/UserScript==

(function(){
	"use strict";

	const settings = {
		hideCaughtUpByDefault: false,
		improvePageTitle: true,
		customTagDropdownList: true, // TODO: Not yet implemented
		invertableTagFiltering: true // TODO: Not yet implemented
	};

	// NOTE: USE GM_getValue SPECIFICALLY, NOT GM.getValue; the latter returns a Promise, and by extension, a headache.
	function readSettings(){
		if (typeof GM_getValue !== "undefined"){
			for(let key in settings){
				settings[key] = GM_getValue(key, settings[key]);
			}
		}
	}

	// NOTE: USE GM_setValue SPECIFICALLY, NOT GM.setValue; the latter returns a Promise, and by extension, a headache.
	function saveSettings(){
		if (typeof GM_setValue !== "undefined"){
			for(let key in settings){
				GM_setValue(key, settings[key]);
			}
		}
	}

	readSettings();
	saveSettings();


	// (async () =>{
	// 	await readSettings();
	// 	await saveSettings();
	// })();


	const labelStrings = {
		caughtUpHider: {
			// Label indicates what the button does when clicked, not the current state.
			click2Hide: 'Hide Caught Up Novels',
			click2Show: 'Show Caught Up Novels'
		}
	};

	GM.addStyle(`
		tbody tr.rl_links:hover{
			background-color: #026bd378 !important;
		}
		/* Dont style lots of elements, just style a single parent element;
		 * instead of ".caught-up-hidden{display: none;}" on many elements,
		 * make them all children of "#hiddenTbl" and apply the style to just the single parent element.
		*/
		#hiddenTbl {
			display: none;
		}
		.userscriptBtn {
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			cursor: pointer;
		}

		/* Not yet used */
		.hidden-custom-tag {
			display: none;
		}
	`);

	const pleaseReportIssueMsg = "Please check the userscript maintainer's repository issues, and report this error if a similar open issue does not already exist.";
	function brokenFeatureMsg(featureName) {
		return pleaseReportIssueMsg + (
			featureName ? '\nYou may choose to disable the "' + featureName + '" feature until the issue has been fixed, to avoid seeing this message repeatedly.' : ''
		);
	}

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function improveTitle() {
		try{
			document.title = 'Reading List: "' + document.querySelector('#cssmenu > ul > li.active').textContent + '" - Novel Updates';
		}
		catch (err){
			if (err instanceof TypeError){ /*ignore*/ }
			else{
				alert(
					'Error while attempting to determine the name of the current reading list.\n' + brokenFeatureMsg('improvePageTitle')
				);
				throw err;
			}
		}
	}

			// document.querySelectorAll('.bmhide > :not(.nu_editnotes):first-child') // get not caught up
			// document.querySelectorAll('.bmhide > span[class*="bm_hide_me"]:first-child') // alternative to get not caught up
	const caughtUpHelper = {
		mainTbl: document.getElementById('myTable read'),
		hiddenTbl: (function(){
			const tbl = document.createElement('table');
			tbl.id = 'hiddenTbl';
			return tbl;
		})(),
		hideCompletedToggleBtn: (function(){
			let toggle = document.createElement('span');
			toggle.id = 'toggleCaughtUpSeries';
			toggle.classList.add('userscriptBtn');
			// toggle.setAttribute('hiding', '');
			// if(settings.hideCaughtUpByDefault){ toggle.setAttribute('hiding', ''); }
			toggle.textContent = labelStrings.caughtUpHider.click2Hide;
			return toggle;
		})(),
		markCaughtUp: async function markCaughtUp(){
			await document.querySelectorAll('.bmhide > .nu_editnotes:first-child')
						  .forEach(async (e) => await e.closest('tr').classList.add('caught-up-hidden'));
		},
		//TODO: FIXME: Modify counter in table header to reflect number of shown/hidden of total
		init: function init(){
			this.markCaughtUp();

			this.mainTbl.insertAdjacentElement('beforeBegin', this.hiddenTbl);

			this.hideCompletedToggleBtn.onclick = updateHidingCompletedState;
			document.querySelector('.mt_rl').append(this.hideCompletedToggleBtn);

			this.hideCompletedToggleBtn.style.setProperty( // MUST come after append
				'margin-right',
				window.getComputedStyle(this.hideCompletedToggleBtn.previousElementSibling).getPropertyValue('margin-right')
			);

			console.log(settings);
			if (settings.hideCaughtUpByDefault){
				// FIXME!!!: something isnt being properly un/set when moving elements from hiddenTbl back to mainTbl,
				// somehow resulting in all unhidden elements being prepended to mainTbl.tBodies[0] AND being unaffected by table sorting.
				// Only seems to occur if hideCompletedToggleBtn has the 'hiding' attribute set. URGENT FIXME!
				// document.getElementById('toggleCaughtUpSeries').setAttribute('hiding', '');
				updateHidingCompletedState();
			}
		}
	};

	// For no apparent reason, things just arbitrarily decide to undefine themselves
	// within this function's scope if it's a method within caughtUpHelper itself...
	// Unfortunately, my experience has been that such nonsense is just typical JavaScript ಠ_ಠ
	async function updateHidingCompletedState(){
			if (caughtUpHelper.hideCompletedToggleBtn.hasAttribute('hiding')){
				// Rows are currently hidden in an invisible table
				// Put rows back into visible table
				await caughtUpHelper.mainTbl.tBodies[0].append(...document.querySelectorAll('#hiddenTbl .caught-up-hidden'));

				// Switch to "button" label for when rows containing caught-up series are all shown.
				// (label indicates what the button does when clicked, not the current state)
				caughtUpHelper.hideCompletedToggleBtn.textContent = labelStrings.caughtUpHider.click2Hide;

				await setTimeout(function wait(){
					// Determine current sorting rule
					let activeSortHeader;
					console.log('trying to re-sort');
					try{
						activeSortHeader = caughtUpHelper.mainTbl.querySelector('th.headerSortUp, th.headerSortDown');
						if (activeSortHeader){
							activeSortHeader.click();
							activeSortHeader.click();
							return;
						}
					}
					catch{
						console.error('Error while attempting to forcibly re-sort table.');
					}
					setTimeout(wait, 300);
				});
			}
			else {
				// All rows (matching any active filters) are currently visible
				// Move rows containing caught-up series to an invisible table
				await caughtUpHelper.hiddenTbl.append(
					...caughtUpHelper.mainTbl.querySelectorAll('.caught-up-hidden'),
					// Also move over any rows being hidden by active filters, which is unfortunately done with inline HTML style attributes instead of CSS classes...
					...Array.prototype.filter.call(caughtUpHelper.mainTbl.querySelectorAll('tbody > tr.rl_links'), e => e.style.display === 'none')
				);

				// Switch to button label for when rows containing caught-up series may be hidden.
				// (label indicates what the button does when clicked, not the current state)
				caughtUpHelper.hideCompletedToggleBtn.textContent = labelStrings.caughtUpHider.click2Show;
			}
			caughtUpHelper.hideCompletedToggleBtn.toggleAttribute('hiding');
			console.log('hideCompletedToggleBtn.hiding is now: ' + caughtUpHelper.hideCompletedToggleBtn.hasAttribute('hiding'));
		}


	// Fuck tracking and analytics
	document.querySelectorAll('script').forEach(s => (s.textContent.includes('urchinTracker') || s.src.includes('analytic')) && s.remove());

	settings.improvePageTitle && improveTitle();
	caughtUpHelper.init();

})();