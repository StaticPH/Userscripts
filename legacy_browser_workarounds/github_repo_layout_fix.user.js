// ==UserScript==
// @name             GitHub Repository Layout Legacy Fix
// @namespace        https://github.com/StaticPH
// @match            https://github.com/*/*
// match            https://github.com/*/*/tree/*
// exclude-match    https://github.com/*/*/actions
// exclude-match    https://github.com/*/*/actions/*
// exclude-match    https://github.com/*/*/blob/*
// exclude-match    https://github.com/*/*/branches
// exclude-match    https://github.com/*/*/branches/*
// exclude-match    https://github.com/*/*/commit/*
// exclude-match    https://github.com/*/*/community
// exclude-match    https://github.com/*/*/discussions
// exclude-match    https://github.com/*/*/discussions/*
// exclude-match    https://github.com/*/*/forks
// exclude-match    https://github.com/*/*/graphs/*
// exclude-match    https://github.com/*/*/issues
// exclude-match    https://github.com/*/*/issues/*
// exclude-match    https://github.com/*/*/network
// exclude-match    https://github.com/*/*/network/*
// exclude-match    https://github.com/*/*/projects
// exclude-match    https://github.com/*/*/pull/*
// exclude-match    https://github.com/*/*/pulls
// exclude-match    https://github.com/*/*/pulls/*
// exclude-match    https://github.com/*/*/pulse
// exclude-match    https://github.com/*/*/releases
// exclude-match    https://github.com/*/*/releases/*
// exclude-match    https://github.com/*/*/repositories
// exclude-match    https://github.com/*/*/rules
// exclude-match    https://github.com/*/*/search*
// exclude-match    https://github.com/*/*/security
// exclude-match    https://github.com/*/*/tags
// exclude-match    https://github.com/*/*/wiki
// exclude-match    https://github.com/*/*/wiki/*
// @exclude-match    https://github.com/about*
// @exclude-match    https://github.com/contact*
// @exclude-match    https://github.com/customer-stories*
// @exclude-match    https://github.com/enterprise*
// @exclude-match    https://github.com/explore*
// @exclude-match    https://github.com/features*
// @exclude-match    https://github.com/login/*
// @exclude-match    https://github.com/marketplace*
// @exclude-match    https://github.com/new*
// @exclude-match    https://github.com/notifications*
// @exclude-match    https://github.com/organizations/*
// exclude-match    https://github.com/orgs/*
// @exclude-match    https://github.com/pricing*
// @exclude-match    https://github.com/search*
// @exclude-match    https://github.com/security*
// @exclude-match    https://github.com/sessions/*
// @exclude-match    https://github.com/settings/*
// @exclude-match    https://github.com/site*
// @exclude-match    https://github.com/team*
// @exclude-match    https://github.com/topics*
// @exclude-match    https://github.com/trending*
// @exclude-match    https://github.com/users/*/projects/*
// @version          1.0.3
// @createdAt        3/7/2026
// @author           StaticPH
// @description      GitHub broke the 2-column layout of repository home-pages, leaving details like the summary and language lists all the way at the bottom of the page. They've since broken a bunch more pages, which this script tries to at least keep navigable.
// @license          MIT
// @updateURL        https://raw.githubusercontent.com/StaticPH/Userscripts/master/legacy_browser_workarounds/github_repo_layout_fix.user.js
// @downloadURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/legacy_browser_workarounds/github_repo_layout_fix.user.js
// @homepageURL      https://github.com/StaticPH/UserScripts
// @supportURL       https://github.com/StaticPH/UserScripts/issues
// @icon             https://github.githubassets.com/pinned-octocat.svg
// @grant            none
// @noframes
// @run-at           document-idle
// ==/UserScript==

(function(){
	"use strict";

	const style = document.createElement('style');
	style.type = 'text/css';

	//// This method doesn't result in consistent sizing for all repositories.
	// style.textContent = `
	// [class*="prc-PageLayout-PageLayoutContent"]{
	// 	display: grid;
	// 	gap: 1em;
	// }
	// [class*="prc-PageLayout-PageLayoutContent"] > [class*="prc-PageLayout-PaneWrapper"]{
	// 	grid-column: none;
	// }`;

	// grid-auto-columns: 85% 32%;

	//// Yes, this creates a new issue with narrow windows... FUTURE WORK! FIXME: if I eventually give a damn.
	style.textContent = `
	[data-selector="repos-split-pane-content"] [class*="prc-PageLayout-PageLayoutContent"] {
		display: grid;
		grid-column-gap: 1em;
		grid-template-columns: 80% 1fr;
	}

	/*
	 * Attempt to fix the infuriating tiny little width difference between the file tree and the readme divs.
	 */
	@media screen and (min-width: 544px) {
		/* .OverviewRepoFiles-module__Box_2__zsLGk */
		[class*="OverviewRepoFiles-module__Box_2__"] {
			width: -webkit-fill-available;
		}
	}

	/*
	 * Make the sticky readme header tabs/links not look totally stupid.
	 */
	/* ul.prc-components-UnderlineItemList-xKlKC > li */
	ul[class*="prc-components-UnderlineItemList-"] > li {
		/* float: left; */
		padding-left: 1em;
		text-align: center;
	}

	ul[class*="prc-components-UnderlineItemList-"] {
		list-style-type: none;
		/* margin-block-start: auto; */
		/* justify-content: right; */
		padding-inline: 0px;
		display: inline-flex;
	}

	/*
	 * Fix GIFs not being shown in READMEs even when permitted by the system settings.
	 */
	:not(.dumb):is([data-a11y-animated-images=system] [data-animated-image]) {
		display: inherit;
	}

	/*
	 * Fix repository navigation tabs being clipped if the window is too narrow
	 */
	.UnderlineNav {
		overflow: auto hidden !important;
	}
	@media screen and (max-width: 768px) {
		.UnderlineNav-body {
			padding-inline-start: 0;
		}
	}

	[data-component="buttonContent"] {
		display: inherit; /*flex*/
	}

	/*
	 * Fix topic/tag links being smushed and lacking a "#" prefix
	 */
	[class*="prc-TopicTag-TopicTag-"]::before {
		content: "#";
	}

	[class*="prc-TopicTag-TopicTag-"]:not(:last-of-type) {
		padding-inline-end: 1ch;
	}
	`;

	/*
	Improve "Code View Header"; the thing with breadcrumbs, the branch switcher, and the button that's meant to toggle the file tree.
	*/
	style.textContent += `
	/* List of links to ancestor directories (path breadcrumbs, but segmented)*/
	ol[class*="Breadcrumb-module__list__"] {
		padding-inline: 0;
		margin-block: auto;
		flex-direction: column;
		/* display: inline-flex; */
	}

	#repos-header-breadcrumb h2 {/*margin-block: 0;*/}

	/* Current file's name in breadcrumbs */
	h1#file-name-id { margin-block: auto; }

	/* Immediate-level container for breadcrumbs (#repos-header-breadcrumb) and the button to copy the path */
	[class*="Breadcrumb-module__container__"].Breadcrumb-module__lg__Rjz0A {/*flex-basis: auto; flex-wrap: wrap; flex-direction: column;*/}

	.react-code-view-header-wrap--narrow {
		flex-grow: 1;
		flex-shrink: 0;
	}

	/* Wide-window view: "Go to file" and "More actions" button */
	.react-code-view-header-element--wide {
		margin: auto;
		flex-grow: 2;
	}

	/* Narrow-window view: "More actions" button */
	.react-code-view-header-element--narrow {
		flex-grow: 0;
		flex-shrink: 1;
		margin: auto;
	}

	@media (min-width: 769px) {
		/* Contains the branch selector button-thing */
		.mr-2.react-code-view-header-mb--narrow {
			margin-top: auto;
			margin-bottom: auto;
		}
	}

	/* Contents of the branch selector button-thing (.mr-2.react-code-view-header-mb--narrow) */
	/*#ref-picker-repos-header-ref-selector-wide > [class*="prc-Button-ButtonContent-"] { display: flex; }*/
	[id*="ref-picker-repos-header-ref-selector"] > [class*="prc-Button-ButtonContent-"] { display: flex; }

	/* "Expand file tree" button */
	h2[class*="use-tree-pane-module__Heading__"] { margin: auto; }

	h2[class*="use-tree-pane-module__Heading__"] > span {
		max-height: max-content;
		align-self: center;
	}

	@media (max-width: 768px) {
		h2[class*="use-tree-pane-module__Heading__"] {
			margin: auto;
			flex-direction: column;
		}
		#file-name-id {/*overflow: scroll;*/}
		ol[class*="Breadcrumb-module__list__"] {/*flex-direction: column; display: inline-flex;*/}
		[class*="Breadcrumb-module__container__"].Breadcrumb-module__lg__Rjz0A {
			display: flex;
			/* flex-direction: column; */
			overflow-x: scroll;
		}
	}

	/* Path portion of breadcrumbs */
	[class*="Breadcrumb-module__container__"] > #repos-header-breadcrumb,
	/* File portion of breadcrumbs (parent of h1#file-name-id) */
	[class*="Breadcrumb-module__container__"] > [class*="Breadcrumb-module__filename__"] { flex-shrink: 1; }`;

	//// Eventually turn this script into one that fixes styles all over the place,
	//// and then disable the according exclude-match directives in the userscript header.
	// if (document.location.pathname.match(/\/pull\/\d+\/?$/)){
		style.textContent += `
		.TimelineItem-body > a.css-truncate.css-truncate-target {
			overflow: visible;
		}
		/*
		 * Colorize PR state indicators
		 */
		[class*="prc-StateLabel-StateLabel-"] {
			border-radius: var(--borderRadius-medium, .375rem);
			border-width: 2px;
			border-style: solid;
			margin-inline-end: 1em;
			padding: 0.5ch;
			/* color: var(--fgColor-onEmphasis); */
		}
		[class*="prc-StateLabel-StateLabel-"][data-status="pullMerged"] {
			/* var(--bgColor-done-emphasis, var(--color-done-emphasis)) */
			background-color: var(--fgColor-done, mediumpurple);
			border-color: var(--fgColor-done, mediumpurple);
		}
		[class*="prc-StateLabel-StateLabel-"][data-status="draft"] {
			/* var(--bgColor-draft-emphasis, var(--color-neutral-emphasis)) */
			background-color: var(--fgColor-disabled, slategray);
			border-color: var(--fgColor-disabled, slategray);
		}
		[class*="prc-StateLabel-StateLabel-"][data-status="pullClosed"] {
			/* var(--bgColor-closed-emphasis, var(--color-closed-emphasis)) */
			background-color: var(--fgColor-danger, firebrick);
			border-color: var(--fgColor-danger, firebrick);
		}
		[class*="prc-StateLabel-StateLabel-"][data-status="pullOpened"] {
			/* var(--bgColor-open-emphasis, var(--color-open-emphasis)) */
			background-color: var(--fgColor-success, green);
			border-color: var(--fgColor-success, green);
		}`
	// }
	// else if (document.location.pathname.match(/\/issues\/\d*/)){
		style.textContent += `
		/*
		 * Fix bad padding creating weird-looking empty space on the right side
		 */
		/*body:not(.wgh-disabled)*/ .application-main div[data-target="react-app.reactRoot"] div[class^='ContentWrapper-module__contentContainer__'] {
			padding-left: 0px;
			padding-right: 0px;
		}
		/*
		 * Fix left-sidebar having nonsensical right-padding.
		 */
		[app-name="issues-react"] [class*="prc-PageLayout-PageLayoutContent"] {
			display: flex;
		}`;
	// }
	// else if (document.location.pathname.match(/\/commit\/\w+/)){
		style.textContent += `
		/*
		 * Contains both the file tree column and the diff column
		 */
		[app-name="commits"] [class*="prc-PageLayout-PageLayoutContent-"] {
			display: grid;
			grid-column-gap: 1em;
			grid-auto-flow: column;
			/*OR JUST display:flex; although the column widths will change*/
		}

		/*
		 * This is an ancestor of the file tree ([app-name="commits"] [class*="prc-PageLayout-PageLayoutContent-"] > this > div > #diff_file_tree)
		 */
		[class*="prc-PageLayout-PaneWrapper-"][class*="Commit-module__Pane__"][class*="Commit-module__TreeExpanded__"] {
			position: sticky;
			overflow: scroll;
			top: 0;
			/* margin-top: var(--base-size-24, 24px) !important; */
			/*top: 2em;
			margin-top: 2em;
			max-height: 90vh !important;*/
		}

		#diff_file_tree > #diff-file-tree-filter {
			padding-top: 2em;
		}

		/*
		 * Each individual item in the file tree
		 */
		/*#diff_file_tree > ul[class*="prc-TreeView-TreeViewRootUlStyles-"] li {
			list-style-type: none;
		}*/


		/* I got lazy, and it's only a matter of time before GitHub decides to muck with things again, and my laziness comes back to haunt me */
		[class*="prc-PageLayout-PageLayoutRoot-"] {
			--spacing-divider: 0;
			--pane-width-custom: 0;
		}

		[class*="prc-PageLayout-PageLayoutRoot-"] {
			--region-order-header: 0;
			--region-order-pane-start: 1;
			--region-order-content: 2;
			--region-order-pane-end: 3;
			--region-order-footer: 4;
			--spacing-none: 0;
			--spacing-condensed: var(--base-size-16, 1rem);
			--spacing-normal: var(--base-size-16, 1rem);
			--pane-width-small: 100%;
			--pane-width-medium: 100%;
			--pane-width-large: 100%;
			--pane-max-width-diff: 511px;
			--sidebar-max-width-diff: 256px;
		/* 	--spacing: var(--spacing-none); */
		}
		@media screen and (min-width: 768px){
			[class*="prc-PageLayout-PageLayoutRoot-"] {
				--pane-width-small: 240px;
				--pane-width-medium: 256px;
				--pane-width-large: 256px;
			}
		}
		@media screen and (min-width: 1012px){
			[class*="prc-PageLayout-PageLayoutRoot-"] {
				--pane-width-small: 256px;
				--pane-width-medium: 296px;
				--pane-width-large: 320px;
				--spacing-normal: var(--base-size-24, 1.5rem);
			}
		}
		@media screen and (min-width: 1280px){
			[class*="prc-PageLayout-PageLayoutRoot-"] {
				--pane-max-width-diff: 959px;
			}
		}

		* {
			box-sizing: border-box;
		}

		/* .ptc-PageLayout-PaneWrapper-pHPop.Commit-module__Pane__RV41k.Commit-module__TreeExpanded__petKx {
			--offset-header: 0px;
			--spacing-row: var(--spacing-none);
			--spacing-column: var(--spacing-none);
		} */
		/* .prc-PageLayout-Pane-AyzHK {
			--spacing: var(--spacing-normal);
			--pane-min-width: 256px;
			--pane-max-width: 567px;
			--pane-width-size: var(--pane-width-medium);
			--pane-width: 296px;
		} */

		[class*="prc-TreeView-TreeViewRootUlStyles-"] {
			margin: 0;
			padding: 0;
			list-style: none;
		}

		[class*="prc-TreeView-TreeViewRootUlStyles-"] [class*="prc-TreeView-TreeViewItem-"] {
			outline: none;
		}

		[class*="DiffFileTree-module__file-tree-row__"]:not(.too-new) {
			/*PROBLEM?: Only "contain" is supported in Chrome 72*/
			content-visibility: auto;
			contain-intrinsic-height: auto 32px;
			contain: strict;
		}

		/* li.PRIVATE_TreeView-item > .PRIVATE_TreeView-item-container[class*="prc-TreeView-TreeViewItemContainer-"] { */
		li.PRIVATE_TreeView-item > [class*="prc-TreeView-TreeViewItemContainer-"] {
			--toggle-width: 1rem;
			--min-item-height: 2rem;
			border-radius: var(--borderRadius-medium, .375rem);
			color: var(--fgColor-default, var(--color-fg-default));
			cursor: pointer;
			font-size: var(--text-body-size-medium, .875rem);
			grid-template-areas: "spacer leadingAction toggle content trailingAction";
			grid-template-columns: var(--spacer-width)var(--leading-action-width)var(--toggle-width)1fr;
			--leading-action-width: calc(var(--has-leading-action, 0)*1.5rem);
			--spacer-width: calc((var(--level) - 1)*(var(--toggle-width)/2));
			width: 100%;
			display: grid;
			position: relative;
		}

		[class*="prc-TreeView-TreeViewRootUlStyles-"] .prc-TreeView-TreeViewItemLevelLine-F-0-2 {
			border-color: var(--borderColor-muted, var(--color-border-muted));
			border-right: var(--borderWidth-thin, .0625rem)solid;
			width: 100%;
			height: 100%;
		}
		@media (hover: hover){
			[class*="prc-TreeView-TreeViewRootUlStyles-"] .prc-TreeView-TreeViewItemLevelLine-F-0-2 {
				border-color: #0000;
			}
		}

		[class*="prc-TreeView-TreeViewRootUlStyles-"][class*="prc-TreeView-TreeViewItemToggle-"] {
			color: var(--fgColor-muted, var(--color-fg-muted));
			height: 100%;
			padding-top: calc(var(--min-item-height)/2 - var(--base-size-12, .75rem)/2);
			grid-area: toggle;
			justify-content: center;
			align-items: flex-start;
			display: flex;
		}

		/* .PRIVATE_TreeView-item-toggle.PRIVATE_TreeView-item-toggle--end.[class*="prc-TreeView-TreeViewItemToggle-"][class*="prc-TreeView-TreeViewItemToggleHover"]class*=["prc-TreeView-TreeViewItemToggleEnd-"] */
		[class*="prc-TreeView-TreeViewRootUlStyles-"][class*="prc-TreeView-TreeViewItemToggleEnd-"] {
			border-bottom-left-radius: var(--borderRadius-medium, .375rem);
			border-top-left-radius: var(--borderRadius-medium, .375rem);
		}

		/* .prc-TreeView-TreeViewRootUlStyles-Mzrmj .PRIVATE_TreeView-item-content.prc-TreeView-TreeViewItemContent-RKsCI { */
		[class*="prc-TreeView-TreeViewRootUlStyles-"] [class*="prc-TreeView-TreeViewItemContent-"] {
			gap: var(--stack-gap-condensed, .5rem);
			height: 100%;
			line-height: var(--custom-line-height, var(--text-body-lineHeight-medium, 1.4285));
			padding: 0 var(--base-size-8, .5rem);
			padding-bottom: calc((var(--min-item-height) - var(--custom-line-height, 1.3rem))/2);
			padding-top: calc((var(--min-item-height) - var(--custom-line-height, 1.3rem))/2);
			grid-area: content;
			display: flex;
		}

		/* .prc-TreeView-TreeViewRootUlStyles-Mzrmj .PRIVATE_VisuallyHidden.prc-TreeView-TreeViewVisuallyHidden-1N8xK { */
		[class*="prc-TreeView-TreeViewRootUlStyles-"] [class*="prc-TreeView-TreeViewVisuallyHidden-"] {
			clip: rect(0, 0, 0, 0);
			white-space: nowrap;
			border-width: 0;
			width: 1px;
			height: 1px;
			margin: -1px;
			padding: 0;
			position: absolute;
			overflow: hidden;
		}

		/* .prc-TreeView-TreeViewRootUlStyles-Mzrmj .PRIVATE_TreeView-item-visual.prc-TreeView-TreeViewItemVisual-naWzj { */
		[class*="prc-TreeView-TreeViewRootUlStyles-"] [class*="prc-TreeView-TreeViewItemVisual-"] {
			color: var(--fgColor-muted, var(--color-fg-muted));
			height: var(--custom-line-height, 1.3rem);
			align-items: center;
			display: flex;
		}

		[class*="prc-TreeView-TreeViewRootUlStyles-"] [class*="prc-TreeView-TreeViewDirectoryIcon-"] {
			color: var(--treeViewItem-leadingVisual-iconColor-rest, var(--color-tree-view-item-directory-fill));
			display: grid;
		}

		[class*="prc-TreeView-TreeViewRootUlStyles-"] [class*="prc-TreeView-TreeViewItemContentText-"] {
			flex: auto;
			width: 0;
		}

		[class*="prc-TreeView-TreeViewRootUlStyles-"]:where([data-truncate-text=true]) [class*="prc-TreeView-TreeViewItemContentText-"] {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		:where([class*="prc-Link-Link-"]) {
			color: var(--fgColor-accent, var(--color-accent-fg));
		/* 	text-underline-offset: .05rem; */
			-webkit-text-decoration: none;
			text-decoration: none;
		}

		:where([class*="prc-Link-Link-"]):where([data-muted=true]) {
			color: var(--fgColor-muted, var(--color-fg-muted));
		}

		[role="group"].sph-expand [class*="DiffFileTree-module__file-tree-row__"]:not(.too-new) {
			contain: content;
		}`;
	// }
	// else if (document.location.pathname.endsWith('/repositories')){
		style.textContent += `
		/*
		 * Collective parent of description line, labels, and topics.
		 * Keep text from sneaking just outside the bounds of the list.
		 */
		[class*="ReposListItem-module__DefaultItemContent__"] {
			box-sizing: border-box;
		}

		/*
		 * The list of repository types (*ActionList*) really doesnt need to
		 * explicitly set its size to the full height of the page.
		 */
		[class*="OrgReposPage-module__pageLayoutPane"] {
			min-height: initial;
		}

		ul[class*="prc-ActionList-ActionList-"],
		[class*="ListView-module__ul__"] {
			list-style-type: none;
			/* padding-inline-start: 0; */
		}

		/*
		 * Since there's usually plenty of horizontal space available,
		 * use columns.
		 */
		[app-name="org-repos-list"] [class*="prc-PageLayout-PageLayoutContent-"] {
			display: grid;
			grid-auto-flow: column;
			grid-auto-columns: auto;
			grid-column-end: auto;
			grid-column-gap: 1em;
			/* grid-template-columns: 1fr fit-content(80vw); */
			/* grid-template-columns: fit-content(80vw); */ /* This really shouldn't have done the trick... */
			grid-template-columns: max-content;
		}

		[class*="ReposListItem-module__TopicsList__"][class*="ReposListItem-module__HideOnSmallScreen__"] > a[href],
		[class*="prc-ActionList-LeadingVisual-"][class*="prc-ActionList-VisualWrap-"] {
			padding-inline-end: 1ch;
		}

		[class*="ReposListItem-module__LabelsContainer__"] > span:not(:last-of-type) {
			padding-inline: 1ch;
		}

		[class*="Description-module__container__"] {
			padding-bottom: 0.5ch;
		}

		/* @media screen and (min-width: 769px) */
		[class*="prc-ActionList-ActionListContent-"][class*="prc-Link-Link-"] {
			display: inline-flex;
			padding-inline: 1ch;
		}

		@media screen and (max-width: 768px) {
			[app-name="org-repos-list"] [class*="prc-PageLayout-PageLayoutContent-"] {
				display: initial;
			}

			/*
			 * No need for that dropdown to exist when it doesn't work,
			 * and the ActionList thing is still around
			 */
			[class*="OrgReposPage-module__pageHeaderContainer__"] {
				display: none;
			}
			/*
			 * Display the action list horizontally to avoid squishing the repo list.
			 */
			ul[class*="prc-ActionList-ActionList-"] {
				display: grid;
				grid-auto-flow: column;
				padding-inline-start: 0;
			}
		}

		[class*="prc-PageLayout-ContentWrapper-"][class*="OrgReposPage-module__orgReposPageContent__"] {
			max-width: none;
			padding: 0;
			margin: 0;
		}

		/*
		 * Put a border around the Public/Private indicators
		 */
		[class*="Title-module__container__"][class*="ReposListItem-module__DefaultItemTitleContainer"] > [class*="prc-Label-Label-"] {
			border-radius: var(--borderRadius-medium, .375rem);
			border: 1px solid black;
			margin-inline: 1ch;
			padding-block: 0.0ch;
			padding-inline: .5ch;
		}

		[class*="ReposListItem-module__SparklineContainer__"]+[class*="prc-TooltipV2-Tooltip-"] {
			display: none;
		}

		[class*="ReposList-module__ReposListContainer__"] [class*="ListView-module__ul__"] > li:not(:last-of-type) {
			/* border-bottom: solid 1px black; */
			/* outline: 1px solid black; */
			/* outline-offset: -.1ch; */
		}`;
	// }





	document.head.append(style);

	// if(['commit','pull','blob'].includes(document.location.pathname.split('/')[3])){
		function toggleDirContents(evnt){
			if (!evnt.target.matches('[role="treeitem"], [role="treeitem"] *')){
				return;
			}
			const dir = evnt.target.closest('[role="treeitem"]');
			const group = dir.querySelector('[role="group"]');
			if (group){
				group.classList.toggle('sph-expand');
			}
		}

		let fileTree = document.querySelector('#diff_file_tree');
		if (fileTree){
			fileTree.addEventListener('click', toggleDirContents);
		}
	// }

	let betterTitle = document.title;
	const [repoOwner, repoName] = document.location.pathname.slice(1).split('/', 2);
	if (document.title.endsWith(' · GitHub')){
		betterTitle = betterTitle.slice(0, -' · GitHub'.length);
	}
	if (betterTitle.endsWith(` · ${repoOwner}/${repoName}`) && betterTitle.startsWith(`${repoName}/`)){ // !betterTitle.startsWith(`${repoName}/${repoName}/`)
		betterTitle = `${repoOwner}/${betterTitle.slice(0, -` · ${repoOwner}/${repoName}`.length)}`;
	}
	if (!betterTitle.startsWith('GitHub - ')){
		betterTitle = `GitHub - ${betterTitle}`;
	}
	document.title = betterTitle.replace(/ · /g, ' - ');

	// const titleParts = document.title.split(' · ');
	// if (titleParts.length === 3){
		//// [{{PATH}}" at "{{BRANCH}}, {{OWNER}}/{{REPO}}, GitHub]
	// }
	// else if (titleParts.length === 2){
		////["GitHub - "{{OWNER}}/{{REPO}}: {{OVERVIEW}}, "GitHub"]'
		////["History for "{{PATH}}" - "{{OWNER}}/{{REPO}}, "GitHub"]'
	// }

	// To use when determining whether to try and recreate the language bar and/or release status
	// const pathSegments = document.location.pathname.slice(1).split('/');
	// const isAtExplicitTreeRoot = pathSegments.length === 4 && pathSegments[2] === 'tree';
	// const isAtRepoRoot = isAtExplicitTreeRoot || Boolean(document.querySelector('meta[name="route-pattern"][content="/:user_id/:repository"], meta[name="analytics-location"][content="/<user-name>/<repo-name>"]'));
	// https://docs.github.com/en/rest/repos#list-repository-languages

	//// FIXME: not all files shown on https://github.com/msys2/MINGW-packages/commit/626f95a0284135331ed93cfa7454be3d3b28aec8
	//// FIXME: anchors do not properly scroll into view
	//// FIXME: no direct link to actual full file
})();
