# StaticPH's Userscripts
[![HitCount](http://hits.dwyl.com/StaticPH/Userscripts.svg)](http://hits.dwyl.com/StaticPH/UserScripts)<br>
Unless otherwise specified in their description, all userscripts have been tested with ViolentMonkey on Chromium 72 or later and on Vivaldi 3.6 or later.
They may also work with GreaseMonkey, TamperMonkey, or on other browsers.

### Get ViolentMonkey for your browser
* [Firefox][ViolentMonkey_Firefox]
* [Google Chrome and (most) Chromium-based browsers][ViolentMonkey_Chrome]
* [Microsoft Edge (which people apparently use)][ViolentMonkey_Edge]
* Alternatively, install ViolentMonkey from its [source][ViolentMonkey_src]
<!--
	* <sub>
		Alternatively, you can try installing ViolentMonkey from its <a href="https://github.com/violentmonkey/violentmonkey/releases">source</a> as an unpacked extension in Chrome/Chromium or as a temporary extension in Firefox.
	</sub>
-->
### Other
* If you use [Pale Moon](https://www.palemoon.org), [Basilisk](https://www.basilisk-browser.org), or [K-Meleon](http://kmeleonbrowser.org), try [this fork of GreaseMonkey v3][GreaseMonkey_v3_Moonchild].<br>
Some scripts will likely require modifications for this to work; if you do this yourself, please submit a pull request so that others may also benefit.

## Important note:
I tend to open a lot of things in new tabs, which happens to result in matching scripts always being injected. As such, many of my userscripts are written to only inject after loading the specific page(s) for which they are written. That means some methods of page navigation (e.g. AJAX) may result in scripts not being injected and executed on pages they should be.

If your browsing habit doesn't involve much opening things in new tabs, you'll likely want to modify/override the exclude-match list for some of my scripts. Alternatively, you could simply refresh relevant pages after the initial navigation, to cause your userscript manager to re-check which scripts should be injected.

One example of such a scenario could be opening a Twitch.tv livestream from the directory view.


---
To add a script:
* Install a script directly from GitHub by clicking on the "install" link in the table below.
<!-- I haven't put any of my userscripts up on any site except GitHub as of this point in time.
* Install a script from GreasyFork (GF) from the userscript site page
* Or, install the scripts from OpenUserJS (OU).
-->

| Userscript<br>Description                      | Direct<br>Install    | Sites               | Supports<br>Auto-Update | License | Created    | Updated    |
|------------------------------------------------|:--------------------:|:-------------------:|:-----------------------:|:-------:|:----------:|:----------:|
| [Hide YouTube Overlay Ads](#HYOA) | [install][raw-HYOA] | N/A | :heavy_check_mark: | MIT | Apr  4, 2020 | Oct 27, 2020 |
| [Fix YouTube Player Bottom Gradient](#FYPBG) | [install][raw-FYPBG] | N/A | :heavy_check_mark: | MIT | Feb 26, 2021 | Mar 30, 2021 |
| [YouTube Channel Keyboard Protection](#YCKP) | [install][raw-YCKP] | N/A | :heavy_check_mark: | MIT | Nov 13, 2021 | May  1, 2022 |
| [Twitch Hide Content Disclosure](#THCD) | [install][raw-THCD] | N/A | :heavy_check_mark: | MIT | Jun 29, 2023 | Dec 12, 2024 |
| [Twitch Hide Channel Leaderboard](#THCL) | [install][raw-THCL] | N/A | :heavy_check_mark: | MIT | Jun 19, 2020 | Dec 12, 2024 |
| [Twitch Hide Overlay Ads](#THOA) | [install][raw-THOA] | N/A | :heavy_check_mark: | MIT | Dec 14, 2023 | Dec 12, 2024 |
| [Twitch Transparent Video Stats](#TTVS) | [install][raw-TTVS] | N/A | :heavy_check_mark: | MIT | May 19, 2021 | Dec 12, 2024 |
| [GitHub Repo Network Tab](#GRNT) | [install][raw-GRNT] | N/A | :heavy_check_mark: | MIT | Apr  6, 2020 | Feb  1, 2024 |
| [Bigger GitHub Network Graph](#BGNG) | [install][raw-BGNG] | N/A | :heavy_check_mark: | MIT | Apr 12, 2020 | Oct 28, 2021 |
| [GitHub Notification Page Tweaks](#GNPT) | [install][raw-GNPT] | N/A | :heavy_check_mark: | MIT | Oct 22, 2020 | Aug  3, 2021 |
| [GitHub Sticky Editor Header](#GSEH) | [install][raw-GSEH] | N/A | :heavy_check_mark: | MIT | Nov 24, 2021 | Nov 24, 2021 |
| [GitLab Description In Title](#GDIT) | [install][raw-GDIT] | N/A | :heavy_check_mark: | MIT | May 22, 2021 | Aug  3, 2021 |
| [Prettier Lib.rs Preformatted Code](#PLPC) | [install][raw-PLPC] | N/A | :heavy_check_mark: | MIT | Jul  5, 2020 | Mar 30, 2021 |
| [Lib.rs Description In Title](#LDIT) | [install][raw-LDIT] | N/A | :heavy_check_mark: | MIT | Apr 28, 2021 | May 11, 2021 |
| [Crates.io Description In Title](#CDIT) | [install][raw-CDIT] | N/A | :heavy_check_mark: | MIT | Mar 16, 2021 | Mar 23, 2025 |
| [Centered Gmail Toast Notifications](#CGTN) | [install][raw-CGTN] | N/A | :heavy_check_mark: | MIT | Jun 19, 2020 | Apr  5, 2021 |
| [Google Meet Ignore Hardware Disabled](#GMIHD) | [install][raw-GMIHD] | N/A | :heavy_check_mark: | MIT | Mar  3, 2023 | Mar  3, 2023 |
| [Wider Google Form Fields](#WGFF) | [install][raw-WGFF] | N/A | :heavy_check_mark: | MIT | Sep 30, 2021 | Aug 19, 2022 |
| [Correct Google Form Correctness](#GFCC) | [install][raw-GFCC] | N/A | :heavy_check_mark: | MIT | Nov  9, 2021 | Nov  9, 2021 |
| [Google Search Lean Query Updates](#GSLQU) | [install][raw-GSLQU] | N/A | :heavy_check_mark: | MIT | Jul 12, 2023 | Sep 28, 2024 |
| [Google Search Footer Privacy](#GSFP) | [install][raw-GSFP] | N/A | :heavy_check_mark: | MIT | Dec 30, 2023 | Dec 30, 2023 |
| [Roll20 Nonscrolling Number Fields](#RNNF) | [install][raw-RNNF] | N/A | :heavy_check_mark: | MIT | Jan 23, 2021 | Apr  5, 2021 |
| [Bypass Blogspot's Blogger IFrame](#BBBI) | [install][raw-BBBI] | N/A | :heavy_check_mark: | MIT | Jun  2, 2021 | May  1, 2022 |
| [Foxaholic Fixes](#FoxF) | [install][raw-FoxF] | N/A | :heavy_check_mark: | MIT | Jun  2, 2021 | Aug 27, 2021 |
| [Mitigate Target \_blank Risk](#MTBR) | [install][raw-MTBR] | N/A | :heavy_check_mark: | MIT | Aug 27, 2021 | Nov 23, 2021 |
| [MSYS2 Package Description In Title](#MDIT) | [install][raw-MDIT] | N/A | :heavy_check_mark: | MIT | Apr 28, 2021 | Sep 28, 2024 |
| [Minecraft CurseForge Title Tweaks](#MCTT) | [install][raw-MCTT] | N/A | :heavy_check_mark: | MIT | Apr 20, 2022 | Jun 18, 2022 |
| [Another "Open In Steam" Button](#OISB) | [install][raw-OISB] | N/A | :heavy_check_mark: | MIT | Nov 25, 2022 | Nov 25, 2022 |
| [Ubuntu Packages Description In Title](#UPDIT) | [install][raw-UPDIT] | N/A | :heavy_check_mark: | MIT | May 11, 2023 | May 11, 2023 |
| [Quietly Reject StackExchange Cookies](#QRSC) | [install][raw-QRSC] | N/A | :heavy_check_mark: | MIT | May 14, 2023 | May 14, 2023 |
| [PyPI Description In Title](#PDIT) | [install][raw-PDIT] | N/A | :heavy_check_mark: | MIT | May 31, 2023 | Aug 15, 2024 |
| [Simple URL Tracker Cleaner](#SUTC) | [install][raw-SUTC] | N/A | :heavy_check_mark: | MIT | Aug 10, 2021 | Jan 28, 2024 |
| [Old Reddit Hide Posts By Sub](#ORHS) | [install][raw-ORHS] | N/A | :heavy_check_mark: | MIT | Apr  8, 2022 | Jul  2, 2023 |
| [ScribbleHub Reading List Upgrades](#SRLU) | [install][raw-SRLU] | N/A | :heavy_check_mark: | MIT | Oct  7, 2022 | Jan 19, 2024 |
| [NovelUpdates Reading List Upgrades](#NRLU) | [install][raw-NRLU] | N/A | :heavy_check_mark: | MIT | Jul  8, 2022 | Nov 16, 2022 |
| [Softpedia Improvements](#SFTPD) | [install][raw-SFTPD] | N/A | :heavy_check_mark: | MIT | Jan  4, 2024 | Jan  4, 2024 |
| [Sublime Package Control Description in Title](#SPCDIT) | [install][raw-SPCDIT] | N/A | :heavy_check_mark: | MIT | Jan 23, 2024 | Jan 23, 2024 |
| [YouTrack Use Standard Scrollbar](#YUSS) | [install][raw-YUSS] | N/A | :heavy_check_mark: | MIT | Aug 22, 2024 | Aug 22, 2024 |
| [StackExchange Wide Mode](#SEWM) | [install][raw-SEWM] | N/A | :heavy_check_mark: | MIT | Jun 20, 2024 | Jun 20, 2024 |
| [Better IzzyOnDroid App Titles](#BIAT) | [install][raw-BIAT] | N/A | :heavy_check_mark: | MIT | May  2, 2024 | May 22, 2025 |

<!-- | [Script Name](#Page_Anchor)           | [install](link)     | [GF][ref] [OU][ref] | :x:                     | MIT     | mmm dd, yyyy | mmm dd, yyyy | -->
<!-- | [Script Name](#Page_Anchor)           | [install][link_ref] | [GF][ref] [OU][ref] | :question:              | MIT     | mmm dd, yyyy | mmm dd, yyyy | -->
---

<!-- Script Details -->
<!-- NOTE: It is important that the anchor be placed on its own line prior to the scriptname heading, otherwise links directly to the heading are liable to position the browser viewport just below the heading, instead of at it. Also note that the closing `</a>` is mandatory, and must also be placed prior to the heading itself.-->
<!-- Format BEGIN
<a name="Anchor_Name"></a>
### Next script

Description
[[Install]][raw-ABBREVIATION]  <a href="greasyfork_link">[Install from GreasyFork]</a>  <a href="OpenUserJS_link">[Install from OpenUserJS]</a>

---

Format END -->
---
<!-- TODO: Decide on format to use for documenting configurable values -->

<a name="HYOA"></a>
### Hide YouTube Overlay Ads

**This script should no longer be needed after Google's removal of overlay ads on April 6th, 2023.**<br>
<br>
You know those little overlay advertisements that pop up on the bottom center of YouTube videos? If those really annoy you, this simple userscript (really just a userstyle wrapped into a userscript) will help by simply preventing them from rendering.<br>
Note that this _does not_ affect other ads.

[[Install]][raw-HYOA]

---

<a name="FYPBG"></a>
### Fix YouTube Player Bottom Gradient

This "fixes" the excessively large bottom gradient area that sometimes appears on the YouTube video player when the mouse cursor is within the player frame.<br>
**So far, I've only seen the phenomenon that led me to write this while using Vivaldi.**

[[Install]][raw-FYPBG]

---

<a name="YCKP"></a>
### YouTube Channel Keyboard Protection

Prevents YouTube from hijacking the Up/Down arrow keys on channel pages, as it likes to do sometimes (Left and Right arrow keys are okay though, because those don't control page scrolling).

[[Install]][raw-YCKP]

---

<a name="THCD"></a>
### Twitch Hide Content Disclosure

Hides the stupid content disclosure overlay from the Twitch.tv video player.<br>
Extensions like FrankerFaceZ may already have this functionality.

[[Install]][raw-THCD]

---

<a name="THCL"></a>
### Twitch Hide Channel Leaderboard

Hides the stupid channel leaderboard on Twitch.tv stream chat.<br>
Extensions like FrankerFaceZ may already have this functionality.

[[Install]][raw-THCL]

---

<a name="THOA"></a>
### Twitch Hide Overlay Ads

Hides the unacceptable overlay ads on Twitch.tv.

[[Install]][raw-THOA]

---

<a name="TTVS"></a>
### Twitch Transparent Video Stats

Makes the video stats overlay on Twitch.tv video player partially transparent, so as to avoid obscuring the stream so much.

[[Install]][raw-TTVS]

---

<a name="GRNT"></a>
### GitHub Repo Network Tab

Adds a navigation tab for faster access to the 'Network' page of a repository.<br>
<br>
Known bugs:
- Occasionally the tab fails to be added, with no clear explanation or pattern. If this occurs, simply reload the page.
- When switching between repository tabs, the network tab sometimes disappears, and something about the way GitHub does page navigation within a repository doesn't cause this script to be re-injected. Short of constantly checking state on a sub-second timer, or using a mutation observer, I don't know how else to solve this.

[[Install]][raw-GRNT]

---

<a name="BGNG"></a>
### Bigger GitHub Network Graph

Makes the timeline on the Network page of GitHub repositories utilize more of that available whitespace on the sides.<br>
Still can't seem to make it use all the space on the right side though...<br>
<br>
Essentially a subset of [Wide GitHub](https://github.com/xthexder/wide-github) which, of course, I only realized after I'd written this.<br>
Oh well, someone will probably find this useful.

[[Install]][raw-BGNG]

---

<a name="GNPT"></a>
### GitHub Notification Page Tweaks

Why does GitHub's beta notifications inbox use a "More" dropdown when there's more than enough space for the 2 elements within?<br>
I don't know, and I dislike having to open a dropdown just to mark something as "read", so I did something about it.

[[Install]][raw-GNPT]

---

<a name="GSEH"></a>
### GitHub Sticky Editor Header

Makes the header of the (text) file editor on GitHub sticky.<br>
Written because I got sick and tired of having to move up and down the page to change to and from the preview while editing this README.

[[Install]][raw-GSEH]

---

<a name="GDIT"></a>
### GitLab Description In Title

Attempts to improve the page titles on GitLab by including the contents of the page's description, if one is provided.<br>
This also replaces instances of Unicode character 0x00B7, "Middle Dot", in the title, as I've found that particular character
has strangely led some editors to erroneously read and write the text in undesired encodings, such as GB2312, instead of UTF-8.

[[Install]][raw-GDIT]

---

<a name="PLPC"></a>
### Prettier Lib.rs Preformatted Code

Makes `<pre><code>` blocks on lib.rs look more like they do on crates.io; lib.rs is so much faster thanks to reduced JS use, but it's not as pretty.

[[Install]][raw-PLPC]

---

<a name="LDIT"></a>
### Lib.rs Description In Title

Replace the unhelpful part of the tab title on a lib.rs crate's page with the short description of the crate, if one is provided.<br>
Convenient for bookmarking and tab-saving extensions, as pages are typically stored according to their titles.

[[Install]][raw-LDIT]

---

<a name="CDIT"></a>
### Crates.io Description In Title

Replace the unhelpful part of the tab title on a crate.io crate's page with the short description of the crate, if one is provided.<br>
Convenient for bookmarking and tab-saving extensions, as pages are typically stored according to their titles.

[[Install]][raw-CDIT]

---

<a name="CGTN"></a>
### Centered Gmail Toast Notifications

Do you hate that Gmail shows a toast notification that blocks functional regions of the UI after you do something to any email? Me too!<br>
This little change should help mitigate the problem by moving the toast notification to the bottom center of the screen.

[[Install]][raw-CGTN]

---

<a name="GMIHD"></a>
### Google Meet Ignore Hardware Disabled

A.K.A "I know my hardware is disabled, Google"<br>
Thanks Google, but I'm well aware that my browser hasn't given you permission to access my hardware; I don't need you showing a prompt that can't be closed with a keypress.

[[Install]][raw-GMIHD]

---

<a name="WGFF"></a>
### Wider Google Form Fields

Widens the input fields in google forms from 50% to 100% of the question element (minus padding).

[[Install]][raw-WGFF]

---

<a name="GFCC"></a>
### Correct Google Form Correctness

Make fields that have been manually marked as correct take on the same styling as fields that exactly matched the preset correct answer.

[[Install]][raw-GFCC]

---

<a name="GSLQU"></a>
### Google Search Lean Query Updates

Proof-of-concept: Prevent modifications to the Google search query in the on-page search bar from inserting a bunch of unwanted parameters into the resulting URL.

[[Install]][raw-GSLQU]

---

<a name="GSFP"></a>
### Google Search Footer Privacy

Hide the "Location" part of the footer on Google Search results, and don't show the email address of the current user.

[[Install]][raw-GSFP]

---

<a name="RNNF"></a>
### Roll20 Nonscrolling Number Fields

This should disable changing the value of any numeric fields on Roll20 character sheets by scrolling.<br>
TODO: Replace the use of setTimeout with a MutationObserver.

[[Install]][raw-RNNF]

---

<a name="BBBI"></a>
### Bypass Blogspot's Blogger IFrame

Unhide the page body and hide obstructive injected iframes on some Blogspot pages, which use those methods for reasons like discouraging ad blocking.

[[Install]][raw-BBBI]

---

<a name="FoxF"></a>
### Foxaholic Fixes

Fix Foxaholic's deliberate breaking of context menus, keypresses, and text selection.

[[Install]][raw-FoxF]

---

<a name="MTBR"></a>
### Mitigate Target \_blank Risk

Appends `rel="noopener noreferrer"` to every link (HTMLAnchorElement, not to be confused with HTMLLinkElement) that has `target="_blank"`, preventing a possible security risk.<br>
This **_will_** break links to some sites, likely any links that would otherwise have opened in a new tab by default.<br>
Users may choose to ignore links from additional url origins, by setting the `customAllowedOrigins` key in the script's value storage to a list of origins, delimited by a single space character, `' '`.<br>
e.g. Setting `customAllowedOrigins` to `'http://wordpress.com https://stackexchange.com https://novelupdates.com'` will prevent this script from modifying links to those origins.

[[Install]][raw-MTBR]

---

<a name="MDIT"></a>
### MSYS2 Package Description In Title

Include the package description on the tab title for a package's page on packages.msys2.org/packages

[[Install]][raw-MDIT]

---

<a name="MCTT"></a>
### Minecraft CurseForge Title Tweaks

Modifies the format of the page title for some of CurseForge's Minecraft pages.

[[Install]][raw-MCTT]

---

<a name="OISB"></a>
### Another "Open In Steam" Button

As the name should imply, this is my own version of a script which adds a new button on Steam's steampowered and steamcommunity sites to open the current page in the Steam app.<br>
Some of the CSS used was borrowed from  https://greasyfork.org/en/scripts/454372-open-steam-url after I spent well over an hour fiddling with my own CSS in the pre-dawn hours, and decided I wasn't going to manage much better.

[[Install]][raw-OISB]

---

<a name="UPDIT"></a>
### Ubuntu Packages Description In Title

Try to provide a minimal, yet meaningful, page title that includes the package description on Ubuntu's package search/archive website.

[[Install]][raw-UPDIT]

---

<a name="QRSC"></a>
### Quietly Reject StackExchange Cookies

Hide the pesky cookie permission requests on StackExchange sites, which don't actually appear to set even "necessary" cookies until the user responds to the permission prompt.<br>
Also hides a few other little things that just don't warrant another tiny script.

[[Install]][raw-QRSC]

---

<a name="PDIT"></a>
### PyPI Description In Title

Rewrite the page title for a PyPI package to include a brief summary, when available.<br>
<br>
Also doesn't use that centered dot character as a separator.

[[Install]][raw-PDIT]

---

<a name="SUTC"></a>
### Simple URL Tracker Cleaner

Scrub various common tracker parameters from URLs. Even if you don't mind being tracked, parameters like these often make URLs rather long; why copy, share, or save a 200 character URL when you could get the exact same content by removing 160 of those characters, without routing traffic through some URL shortening service?<br>
<br>
Primarily targets parameters related to Google, Amazon, and Facebook.<br>
<br>
<sub>
Icon from: <a href="https://www.flaticon.com/free-icon/fly-swatter_185441" title="Fly Swatter">Fly Swatter free icon created by Freepik - Flaticon</a>
</sub>

[[Install]][raw-SUTC]

---

<a name="ORHS"></a>
### Old Reddit Hide Posts By Sub

Hide posts from arbitrary subreddits (unless specifically looking at them, of course).<br>
<br>
Only works for old.reddit.com, not www.reddit.com, because not only does the latter use a DOM structure that makes it unsuitable for applying styles to entire post-elements by the CSS selector of the child element holding the subreddit, it _also_ commits the desktop (and frankly, even mobile) user-experience war-crime of infinite pagination (endless scrolling). **TLDR: Modern Reddit UI sucks, and supporting it would take more effort than I'm willing to put in to this for my own use.**

[[Install]][raw-ORHS]

---

<a name="SRLU"></a>
### ScribbleHub Reading List Upgrades

Allows hiding novels the user is caught up on from their reading lists, adds the current reading list name to the page title, and more planned.

[[Install]][raw-SRLU]

---

<a name="NRLU"></a>
### NovelUpdates Reading List Upgrades

Allows hiding novels the user is caught up on from their reading lists, adds the current reading list name to the page title, and more planned.

[[Install]][raw-NRLU]

---

<a name="SFTPD"></a>
### Softpedia Improvements

Cleans up junk on Softpedia, and rewrites product homepage links to use the actual URL instead of calling php code.

[[Install]][raw-SFTPD]

---

<a name="SPCDIT"></a>
### Sublime Package Control Description in Title

When browsing Sublime Text plugins on Package Control, it can be useful to include plugin descriptions in the page title. If a description is provided for the currently viewed plugin, do just that.

[[Install]][raw-SPCDIT]

---

<a name="YUSS"></a>
### YouTrack Use Standard Scrollbar

Use the browser's regular scrollbar style on JetBrains' YouTrack pages

[[Install]][raw-YUSS]

---

<a name="SEWM"></a>
### StackExchange Wide Mode

StackExchange sites should take better advantage of the horizontal screen space, particularly on question pages. This removes the width restrictions on the main content part of those pages.

[[Install]][raw-SEWM]

---

<a name="BIAT"></a>
### Better IzzyOnDroid App Titles

Adds app description to page titles where possible.

[[Install]][raw-BIAT]

---
## Legacy Workaround Scripts

These scripts are simple (or painfully convoluted) and clumsy workarounds for behavior that no longer functions correctly in my years-old portable Chromium.
If you've updated your browser to the current release at any point in the last few years, you almost certainly don't want these.

---

<a name="DFSF"></a>
### Legacy Discussion Forum Scroll Fixer

Fix for Discourse forums breaking the ability to scroll on browsers that are too old or are blocking some script or other.

[[Install]][raw-DFSF]

---

<a name="GLHW"></a>
### GitHub Line Hyperlink Workaround

Add simple onclick handlers to the line numbers when viewing files on GitHub, as the normal behavior of linking directly to a clicked line number seems to have broken on legacy browsers as a result of some change to the implementation.

[[Install]][raw-GLHW]

---

<a name="GNAW"></a>
### GitHub Notifications Archive Workaround

Quick and simple redirect to work around strange behavior of being sent to github.com/notifications/beta/archive when marking notifications as done.

[[Install]][raw-GNAW]

---

<a name="GCDW"></a>
### GitHub Collapsed Details Workaround

Add simple onclick handlers to the collapsed details of commits on GitHub, as the normal behavior of expanding the ellipses to the full commit message when clicked seems to have broken on legacy browsers as a result of some change to the implementation.

[[Install]][raw-GCDW]

---

<a name="GLRAW"></a>
### GitHub Lazy Release Asset Workaround

Multiple fixes related to user-downloadable asset files on GitHub for users of legacy browsers.
- Fetch asset list for releases, as the code that should already have been responsible for that is too modern, and is thus never even attempted on legacy browsers.
- Fix the timestamps on the release page(s), most of which are within asset lists.
- Slightly changes normal behavior by automatically showing __all__ assets for the first release on the page, whether that's two assets or fourty assets.

[[Install]][raw-GLRAW]

---

<a name="SELCE"></a>
### StackExchange Legacy Comments Expander

Replace 'Show X more comments' handler for StackExchange sites to better support older browsers; in particular, this enables showing all comments when using Chromium 72.

[[Install]][raw-SELCE]

---

## Issues
Please report any issues within this repository's [issue section](https://github.com/StaticPH/Userscripts/issues)<br>
<br>
Additionally, I do occasionally take requests for simple scripts, so feel free to ask. Please bear in mind that JavaScript is not a language I consider pleasant to use, nor do I consider myself particularly competent with it. I reserve the right to refuse any request with or without comment.

---

## Some of the awesome scripts I use from other authors
- [Wide GitHub](https://github.com/xthexder/wide-github)
- [GitHub Code Folding](https://openuserjs.org/scripts/Mottie/GitHub_Code_Folding)
- [GitHub Gist Search Box](https://greasyfork.org/en/scripts/395318-github-gist-search-box)
- [GitHub Search Autocomplete](https://github.com/Mottie/GitHub-userscripts/wiki/GitHub-search-autocomplete)
- [GitHub - Add Path Search](https://gist.github.com/splintor/8d3f12b86962efe5dcacb28ca15aa87d)
- [SteamWorkshopSearch](https://openuserjs.org/scripts/Seishiin/SteamWorkshopSearch) (AKA SteamWorkshop - Subscribed Mods Search)
- [Curseforge QOL Fixes](https://github.com/comp500/Curseforge-Userscripts/)
- [Breezewiki Redirector](http://alphamethyl.barr0w.net/~barrow/src/barrownet_ca_redirector/breezewiki_redirector.user.js)
- [GitHub Network Ninja](https://github.com/maliayas/github-network-ninja/blob/master/main.user.js)


<!-- Link References -->
<!-- Format BEGIN
[raw-ABBREVIATION]: raw url of script on GitHub/Gist/wherever
Append "?raw=1" to a file link to create a link to the raw file (may be GitHub specific).
	That is to say, the following two lines are interchangeable
	[ANCHOR]: https://raw.githubusercontent.com/USER/REPO/BRANCH/FILEPATH
	[ANCHOR]: https://github.com/USER/REPO/BRANCH/blob/FILEPATH?raw=1
As explained on <https://stackoverflow.com/questions/7653483/github-relative-link-in-markdown-file/7658676>, it should also be possible to create branch-relative links in GitHub README (and other markup) files, simply by only using the path to the file (i.e. replace "https://github.com/USER/REPO/BRANCH/blob/FILEPATH" with "FILEPATH"). This should also work relative to the repository root if prefixed with '/', and relative to the path of the markup file using '../' and './'

[gf-ABBREVIATION]: url of script on GreasyFork

[ou-ABBREVIATION]: url of script on OpenUserJS
Format END -->
[raw-HYOA]: /hide_youtube_overlay_ads.user.js?raw=1
[raw-FYPBG]: /fix_youtube_player_bottom_gradient.user.js?raw=1
[raw-YCKP]: /youtube_channel_keyboard_protector.user.js?raw=1
[raw-THCD]: /twitch_hide_content_disclosure.user.js?raw=1
[raw-THCL]: /twitch_hide_channel_leaderboard.user.js?raw=1
[raw-THOA]: /twitch_hide_overlay_ads.user.js?raw=1
[raw-TTVS]: /twitch_transparent_video_stats.user.js?raw=1
[raw-GRNT]: /github_repo_network_tab.user.js?raw=1
[raw-BGNG]: /bigger_github_repo_network_graph.user.js?raw=1
[raw-GNPT]: /github_notification_page_tweaks.user.js?raw=1
[raw-GSEH]: /github_sticky_editor_header.user.js?raw=1
[raw-GDIT]: /gitlab_description_in_title.user.js?raw=1
[raw-PLPC]: /prettier_librs_preformatted_code.user.js?raw=1
[raw-LDIT]: /librs_description_in_title.user.js?raw=1
[raw-CDIT]: /cratesio_description_in_title.user.js?raw=1
[raw-CGTN]: /centered_gmail_toast_notifications.user.js?raw=1
[raw-GMIHD]: /google_meet_ignore_hardware_disabled.user.js?raw=1
[raw-WGFF]: /wider_google_form_fields.user.js?raw=1
[raw-GFCC]: /correct_google_form_correctness.user.js?raw=1
[raw-GSLQU]: /google_search_lean_query_updates.user.js?raw=1
[raw-GSFP]: /google_search_footer_privacy.user.js?raw=1
[raw-RNNF]: /roll20_character_sheet_no_scrolling_number_fields.user.js?raw=1
[raw-BBBI]: /bypass_blogspots_blogger_iframe.user.js?raw=1
[raw-FoxF]: /foxaholic_fixes.user.js?raw=1
[raw-MTBR]: /mitigate_target_blank_risk.user.js?raw=1
[raw-MDIT]: /msys2_package_description_in_title.user.js?raw=1
[raw-MCTT]: /minecraft_curseforge_title_tweaks.user.js?raw=1
[raw-OISB]: /steam_app_from_webpage.user.js?raw=1
[raw-UPDIT]: /ubuntu_packages_description_in_title.user.js?raw=1
[raw-QRSC]: /quietly_reject_stackexchange_cookies.user.js?raw=1
[raw-PDIT]: /pypi_description_in_title.user.js?raw=1
[raw-SUTC]: /simple_url_tracker_cleaner.user.js?raw=1
[raw-ORHS]: /reddit_hide_by_subreddit.user.js?raw=1
[raw-SRLU]: /scribblehub_reading_list_upgrades.user.js?raw=1
[raw-NRLU]: /novelupdates_reading_list_upgrades.user.js?raw=1
[raw-SFTPD]: /softpedia_improvements.user.js?raw=1
[raw-SPCDIT]: /sublime_package_control_description_in_title.user.js?raw=1
[raw-YUSS]: /youtrack_use_standard_scrollbar.user.js?raw=1
[raw-SEWM]: /stackexchange_wide_mode.user.js?raw=1
[raw-BIAT]: /izzyondroid_description_in_title.user.js?raw=1

<!-- Legacy Workaround Scripts -->
[raw-DFSF]: /legacy_browser_workarounds/discourse_forum_scroll_fixer.user.js?raw=1
[raw-GLHW]: /legacy_browser_workarounds/github_line_hyperlink_workaround.user.js?raw=1
[raw-GNAW]: /legacy_browser_workarounds/github_notifications_archive_workaround.user.js?raw=1
[raw-GCDW]: /legacy_browser_workarounds/github_collapsed_details_workaround.user.js?raw=1
[raw-GLRAW]: /legacy_browser_workarounds/github_lazy_release_asset_workaround.user.js?raw=1
[raw-SELCE]: /legacy_browser_workarounds/stackexchange_legacy_comments_expander.user.js?raw=1

<!-- General Link References -->
[ViolentMonkey_src]: https://github.com/violentmonkey/violentmonkey/releases
[ViolentMonkey_Firefox]: https://addons.mozilla.org/firefox/addon/violentmonkey/
[ViolentMonkey_Chrome]: https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag
[ViolentMonkey_Edge]: https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjdenkkddmbclomhiblgggliao
[GreaseMonkey_v3_Moonchild]: https://github.com/janekptacijarabaci/greasemonkey/releases
