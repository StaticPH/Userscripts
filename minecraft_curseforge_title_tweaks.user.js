// ==UserScript==
// @name           Minecraft CurseForge Title Tweaks
// @namespace      https://github.com/StaticPH
// @match          https://www.curseforge.com/minecraft/mc-mods/*
// @match          https://legacy.curseforge.com/minecraft/mc-mods/*
// @version        1.1
// @createdAt      4/20/2022, 5:46:34 PM
// @author         StaticPH
// @description    Modifies the format of the page title for some of CurseForge's Minecraft pages.
// @license        MIT
// @updateURL      https://raw.githubusercontent.com/StaticPH/Userscripts/master/minecraft_curseforge_title_tweaks.user.js
// @downloadURL    https://raw.githubusercontent.com/StaticPH/Userscripts/master/minecraft_curseforge_title_tweaks.user.js
// @homepageURL    https://github.com/StaticPH/UserScripts
// @supportURL     https://github.com/StaticPH/UserScripts/issues
// @icon           data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAg%0D%0ANTMuNSI+PHBhdGggZmlsbD0iIzQ4NDg0OCIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMCA2Ljkw%0D%0AODJsMjcuOTUzMi4wNzU2TDI2LjI2OSAwaDczLjc0NDlsLS4wMTY0IDguMTQzM0M4Ny41IDEwLjYz%0D%0ANDggNzguNjcyNiAxNi43NzUgNzQuODI1IDM2LjM0SDcyLjA0NmwtMS41ODE1IDQuMzU5aDIuMzA3%0D%0AOWwzLjk5MDYgMTIuODA4N0gzNy45NjFsMy45MTg0LTEyLjgwODZoMi4zMjVsLTEuNjQ2Ny00LjM1%0D%0AOWgtMi43NjQybC01LjE1MTYtMTMuNzUzNUMxMy41MjAzIDIxLjM0MzcgMi42NzQ4IDE2LjkwNDIg%0D%0AMCA2LjkwODJ6TTU4LjY3NzIgMzkuMDYyYy0zLjA4Mi01LjYyMTYtNS4xMDU4LTEuMTk3LTExLjQ0%0D%0ANTQtNi45NDk2LTIuNDcyNy0yLjI0MzYtMy40NTg4LTguODE5OSAyLjA5Ny0xMC44MzAxLTIuNTI1%0D%0ANSA1LjU3NDkgNC4wMjk3IDcuODU1OCA1LjU4OTggNC42Njg1LjcwOS0xLjQ0ODYgMS42MDM5LTQu%0D%0AMTIwNC0uOTc5OC01Ljk1MTgtMS4zOTItLjk4NjctMS45MjgxLTMuOTEyNS0uNzM2NC01LjUzODgu%0D%0AMzgzNyAxLjIwOTMgMS41OTM4IDIuNTAxMyAzLjkxNiAxLjU0MTEtNC45MTkyLTguMTQwNCAyLjkz%0D%0ANC0xMC45NDU3IDYuNzEwNC0xMC41ODE3LTMuOTY4Ni40NDEtNi4wMjUgMy45NzctNC4yMTk2IDcu%0D%0AODI2OSAxLjE1IDIuNDUyIDIuOTAwNiAzLjY1ODkgMy40MDk3IDUuNjY1Ny0xLjY5NTIuMTI2My0y%0D%0ALjE4NTIuOTA2NS0yLjE0OTUgMi4zNjIuMDI2OCAxLjA4OTUgMi41NDk2IDIuNjY0NiAyLjk0OTQt%0D%0ALjQ0NTYgMS4xNzUgMi40MjQ1LS4yNDA3IDMuODQ5Ni0xLjAxMjkgNC45OTg0LTEuNzgyNCAyLjY1%0D%0AMTUtLjEwMzYgNS40MTA3IDIuMTA5NyAzLjMwNjcuOTU0Ny0uOTA3NCAxLjYxNTUtMi41ODEyLjQw%0D%0ANDgtNS4zMTggMi4yMjkgMS43NzYgNC41MDU3IDYuNTQ0Ny45MDc5IDEwLjY3Ny0xLjc1NiAyLjAx%0D%0ANy02Ljk1MTQgMS4zOTEtNy41NTEgNC41NjkzeiIvPjwvc3ZnPg==
// @grant          none
// @run-at         document-end
// ==/UserScript==

(function(){
	"use strict";
	if (document.location.href.match(/search\?/)){
		let queryMatches = document.location.search.match(/search=([^&?#]+)(?:[&?#].+)?$/);
		if (queryMatches && queryMatches[1] !== undefined) {
			document.title = 'CurseForge Minecraft Mod Search - ' + queryMatches[1];
		}
		else {
			document.title = 'CurseForge Minecraft Mod Search - Invalid Query';
		}
	}
	else {
		if (document.location.pathname.startsWith('/minecraft/mc-mods/')){
			const findModTitle = document.querySelector('header > .container > div > div > div > h2, .project-header > h1');
			const modTitle = !findModTitle ? 'ERROR NO TITLE FOUND' : findModTitle.textContent.replace(/[[{(]\s*F(orge|abric)\s?[&/]\s?F(orge|abric)\s*[\])}]/i, '');
			document.title = modTitle;
			if (document.location.pathname.includes('/files')){
				// if (document.location.pathname.endsWith('/')){  }
				document.title += ' - Downloads';
			}
			else if (document.location.pathname.endsWith('/screenshots')){
				document.title += ' - Images' ;
			}
			else if (document.location.pathname.endsWith('/relations/dependencies')){
				document.title += ' - Dependencies';
			}
			else if (document.location.pathname.endsWith('/relations/dependents')){
				document.title += ' - Dependents';
			}
			document.title += ' - CurseForge Minecraft Mods';
		}
		if (document.title.match('Mods - Projects - CurseForge')){
			document.title = document.title.replace('Mods - Projects - CurseForge', '') + 'CurseForge Minecraft Projects';
		}
		else if (document.title.match('Mods - Minecraft - CurseForge')){
			document.title = document.title.replace('Mods - Minecraft - CurseForge', '') + 'CurseForge Minecraft Mods';
		}
	}

	let page = document.location.search.match(/(?:[&?])page=(?:0+)?([1-9](?:[0-9]+)?)/);
	if (page && page[1] !== undefined){
		document.title = document.title + ' - Page ' + page[1];
	}
})();
