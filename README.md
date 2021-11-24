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
		Alternatively, you can try installing ViolentMonkey from its <a href="https://github.com/violentmonkey/violentmonkey/releases">source</a> as an unpacked extension in Chrome/Chromium or as a temporary extension in firefox.
	</sub>
-->
### Other
* If you use [Pale Moon](http://www.palemoon.org/) or [Basilisk](https://www.basilisk-browser.org), try [this fork of GreaseMonkey v3][GreaseMonkey_v3_Moonchild].<br>
Some scripts will likely require modifications for this to work; if you do this yourself, please submit a pull request so that others may also benefit.


---
To add a script:
* Install a script directly from GitHub by clicking on the "install" link in the table below.
<!-- I haven't put any of my userscripts of mine up on any site except GitHub
* Install a script from GreasyFork (GF) from the userscript site page
* Or, install the scripts from OpenUserJS (OU).
-->

| Userscript<br>Description                  | Direct<br>Install   | Sites               | Supports<br>Auto-Update | License | Created    | Updated    |
|--------------------------------------------|:-------------------:|:-------------------:|:-----------------------:|:-------:|:----------:|:----------:|
| [Hide YouTube Overlay Ads](#HYOA)          | [install][raw-HYOA] | N/A                 | :heavy_check_mark:      | MIT     | 2020:04:04 | 2020:10:27 |
| [Fix Youtube Player Bottom Gradient](#FYPBG)   | [install][raw-FYPBG] | N/A                 | :heavy_check_mark:      | MIT     | 2021:02:26 | 2021:03:30 |
| [Twitch Hide Channel Leaderboard](#THCL)   | [install][raw-THCL] | N/A                 | :heavy_check_mark:      | MIT     | 2020:06:19 | 2021:03:30 |
| [Twitch Transparent Video Stats](#TTVS)    | [install][raw-TTVS] | N/A                 | :heavy_check_mark:      | MIT     | 2021:05:19 | 2021:05:19 |
| [Github Repo Network Tab](#GRNT)           | [install][raw-GRNT] | N/A                 | :heavy_check_mark:      | MIT     | 2020:04:06 | 2021:11:23 |
| [Bigger Github Network Graph](#BGNG)       | [install][raw-BGNG] | N/A                 | :heavy_check_mark:      | MIT     | 2020:04:12 | 2021:10:28 |
| [Github Notification Page Tweaks](#GNPT)   | [install][raw-GNPT] | N/A                 | :heavy_check_mark:      | MIT     | 2020:10:22 | 2021:08:03 |
| [Github Sticky Editor Header](#GSEH)     | [install][raw-GSEH] | N/A                 | :heavy_check_mark:      | MIT     | 2020:11:24 | 2021:11:24 |
| [GitLab Description In Title](#GDIT)       | [install][raw-GDIT] | N/A                 | :heavy_check_mark:      | MIT     | 2021:05:22 | 2021:08:03 |
| [Prettier Lib.rs Preformatted Code](#PLPC) | [install][raw-PLPC] | N/A                 | :heavy_check_mark:      | MIT     | 2020:07:05 | 2021:03:30 |
| [Lib.rs Description in Title](#LDIT)       | [install][raw-LDIT] | N/A                 | :heavy_check_mark:      | MIT     | 2021:05:11 | 2021:05:11 |
| [Crates.io Description In Title](#CDIT)    | [install][raw-CDIT] | N/A                 | :heavy_check_mark:      | MIT     | 2021:03:16 | 2021:04:23 |
| [Roll20 Nonscrolling Number Fields](#RNNF) | [install][raw-RNNF] | N/A                 | :heavy_check_mark:      | MIT     | 2021:01:23 | 2021:04:05 |
| [Centered Gmail Toast Notifications](#CGTN)   | [install][raw-CGTN] | N/A                 | :heavy_check_mark:      | MIT     | 2020:06:19 | 2021:03:30 |
| [Bypass Blogspots Blogger IFrame](#BBBI)   | [install][raw-BBBI] | N/A                 | :heavy_check_mark:      | MIT     | 2021:06:02 | 2021:06:02 |
| [Foxaholic Fixes](#FoxF)                   | [install][raw-FoxF] | N/A                 | :heavy_check_mark:      | MIT     | 2021:06:02 | 2021:08:27 |
| [Wider Google Form Fields](#WGFF)          | [install][raw-WGFF] | N/A                 | :heavy_check_mark:      | MIT     | 2021:09:30 | 2021:09:30 |
| [Correct Google Form Correctness](#GFCC)   | [install][raw-GFCC] | N/A                 | :heavy_check_mark:      | MIT     | 2021:11:09 | 2021:11:09 |
| [Mitigate Target \_blank Risk](#MTBR)       | [install][raw-MTBR] | N/A                 | :heavy_check_mark:      | MIT     | 2021:08:27 | 2021:11:23 |
| [MSYS2 Package Description in Title](#MDIT)   | [install][raw-MDIT] | N/A                 | :heavy_check_mark:      | MIT     | 2021:05:11 | 2021:05:11 |

<!-- | [Github PR Obvious Fork Compare Button](#GPOFCB)   | [install][raw-GPOFCB] | N/A                 | :heavy_check_mark:      | MIT     | 2021:03:16 | 2021:03:16 | -->
<!-- | [Crates.io Common Meta Near Top](#CCMNT)   | [install][raw-CCMNT] | N/A                 | :heavy_check_mark:      | MIT     | 2021:03:16 | 2021:04:05 | -->
<!-- | [Brute Force Medium Workaround](#BFMW)     | [install][raw-BFMW] | N/A                 | :heavy_check_mark:      | MIT     | 2021:03:31 | 2021:04:05 | -->

<!-- | [Script Name](#Page_Anchor)           | [install](link)     | [GF][ref] [OU][ref] | :x:                     | MIT     | yyyy:mm:dd | yyyy:mm:dd | -->
<!-- | [Script Name](#Page_Anchor)           | [install][link_ref] | [GF][ref] [OU][ref] | :question:              | MIT     | yyyy:mm:dd | yyyy:mm:dd | -->

<!-- Script Details -->
<!-- Format BEGIN
### Next script <a name="Anchor_Name"></a>

Description
[[Install]][raw-ABBREVIATION]  <a href="greasyfork_link">[Install from GreasyFork]</a>  <a href="OpenUserJS_link">[Install from OpenUserJS]</a>

---

Format END -->
---

### Hide YouTube Overlay Ads <a name="HYOA"></a>

You know those little overlay advertisements that pop up on the bottom center of YouTube videos? If those really annoy you, this simple userscript (really just a userstyle wrapped into a userscript) will help by simply preventing them from rendering.<br>
Note that this _does not_ affect other ads.

[[Install]][raw-HYOA]

---

### Fix Youtube Player Bottom Gradient <a name="FYPBG"></a>

This "fixes" the excessively large bottom gradient area that sometimes appears on the YouTube video player when the mouse cursor is within the player frame.<br>
**So far, I've only seen the phenomenon that led me to write this while using Vivaldi.**

[[Install]][raw-FYPBG]

---

### Twitch Hide Channel Leaderboard <a name="THCL"></a>

Hides the stupid channel leaderboard on Twitch.tv stream chat.<br>
Extensions like FrankerFaceZ may already have this functionality.

[[Install]][raw-THCL]

---

### Twitch Transparent Video Stats <a name="TTVS"></a>

Makes the video stats overlay on Twitch.tv video player partially transparent, so as to avoid obscuring the stream so much.<br>

[[Install]][raw-TTVS]

---

### Github Repo Network Tab <a name="GRNT"></a>

Adds a navigation tab for faster access to the 'Network' page of a repository.

Known bugs:
- Occasionally the tab fails to be added, with no clear explanation or pattern. If this occurs, simply reload the page.
- When switching between repository tabs, the network tab often disappears, and something about the way Github does page navigation within a repository doesn't cause this script to be re-injected. Short of constantly checking state on a sub-second timer, or using a mutation observer, I don't know how else to solve this.

[[Install]][raw-GRNT]

---

### Bigger Github Repo Network Graph <a name="BGNG"></a>

Makes the timeline on the Network page of Github repositories utilize more of that available whitespace on the sides.<br>
Still can't seem to make it use all the space on the right side though...

Essentially a subset of [Wide Github](https://github.com/xthexder/wide-github) which, of course, I only realized after I'd written this.
Oh well, someone will probably find this useful.

[[Install]][raw-BGNG]

---

### Github Notification Page Tweaks <a name="GNPT"></a>

Why does GitHub's beta notifications inbox use a "More" dropdown when there's more than enough space for the 2 elements within?
I don't know, and I dislike having to open a dropdown just to mark something as "read", so I did something about it.

[[Install]][raw-GNPT]

---

### Github Sticky Editor Header <a name="GSEH"></a>

Makes the header of the (text) file editor on GitHub sticky.<br>
Written because I got sick and tired of having to move up and down the page to change to and from the preview while editing this README.

[[Install]][raw-GSEH]

---
<!--

### Github PR Obvious Fork Compare Button <a name="GPOFCB"></a>

Makes it a little more obvious on the page for comparing Github branches that "compare across forks" acts like a button.<br>
The default look gives the impression that it's a link to documentation, and for the life of me I never remember it isn't.

[[Install]][raw-GPOFCB]

---
-->

### GitLab Description In Title <a name="GDIT"></a>

Attempts to improve the page titles on GitLab by including the contents of the page's description, if one is provided.<br>
This also replaces instances of Unicode character 0x00B7, "Middle Dot", in the title, as I've found that particular character
has strangely led some editors to erroneously read and write the text in undesired encodings, such as GB2312, instead of UTF-8.

[[Install]][raw-GDIT]

---

### Prettier Lib.rs Preformatted Code <a name="PLPC"></a>

Makes `<pre><code>` blocks on lib.rs look more like they do on crates.io; lib.rs is so much faster thanks to reduced JS use, but it's not as pretty.

[[Install]][raw-PLPC]

---

### Lib.rs Description In Title <a name="LDIT"></a>

Replace the unhelpful part of the tab title on a lib.rs crate's page with the short description of the crate, if one is provided.<br>
Convenient for bookmarking and tab-saving extensions, as pages are typically stored according to their titles.

[[Install]][raw-LDIT]

---

### Crates.io Description In Title <a name="CDIT"></a>

Replace the unhelpful part of the tab title on a crate.io crate's page with the short description of the crate, if one is provided.<br>
Convenient for bookmarking and tab-saving extensions, as pages are typically stored according to their titles.

[[Install]][raw-CDIT]

---
<!--

### Crates.io Common Meta Near Top <a name="CCMNT"></a>

When I visit a crate's page on crates.io, the first things I want to see are the crate name, short description,
associated categories and keywords, the time since the most recent release, and a link to the crate's source code if it is public. <br>
I don't know if I'm the only one, but in my mind, it only makes sense for those to be in the same place.

[[Install]][raw-CCMNT]

---
-->

### Roll20 Nonscrolling Number Fields <a name="RNNF"></a>

This should disable changing the value of any numeric fields on Roll20 character sheets by scrolling. <br>
TODO: Replace the use of setTimeout with a MutationObserver.

[[Install]][raw-RNNF]

---

### Centered Gmail Toast Notifications <a name="CGTN"></a>

Do you hate that Gmail shows a toast notification that blocks functional regions of the UI after you do something to any email? Me too! <br>
This little change should help mitigate the problem by moving the toast notification to the bottom center of the screen.

[[Install]][raw-CGTN]

---

### Bypass Blogspot's Blogger IFrame <a name="BBBI"></a>

Unhide the page body and hide obstructive injected iframes on some Blogspot pages, which use those methods for reasons like discouraging ad blocking. <br>

[[Install]][raw-BBBI]

---

### Foxaholic Fixes <a name="FoxF"></a>

Fix Foxaholic's deliberate breaking of context menus, keypresses, and text selection.

[[Install]][raw-FoxF]

---

### Wider Google Form Fields <a name="WGFF"></a>

Unhide the page body and hide obstructive injected iframes on some Blogspot pages, which use those methods for reasons like discouraging ad blocking. <br>

[[Install]][raw-WGFF]

---

### Correct Google Form Correctness <a name="GFCC"></a>

Make fields that have been manually marked as correct take on the same styling as fields that exactly matched the preset correct answer.

[[Install]][raw-GFCC]

---

### Mitigate Target \_blank Risk <a name="MTBR"></a>

Appends `rel="noopener noreferrer"` to every link (HTMLAnchorElement, not to be confused with HTMLLinkElement) that has `target="_blank"`, preventing a possible security risk.<br>
This **_will_** break links to some sites, likely any links that would otherwise have opened in a new tab by default.<br>
Users may choose to ignore links from additional url origins, by setting the `customAllowedOrigins` key in the script's value storage to a list of origins, delimited by a single space character, `' '`.<br>
e.g. Setting `customAllowedOrigins` to `'http://wordpress.com https://stackexchange.com https://novelupdates.com'` will prevent this script from modifying links to those origins.

[[Install]][raw-MTBR]

---

### MSYS2 Package Description in Title <a name="MDIT"></a>

Include the package description on the tab title for a package's page on packages.msys2.org/packages

[[Install]][raw-MDIT]

---
<!--

### Brute Force Medium Workaround <a name="BFMW"></a>

Brute force access to articles on Medium.com, always trying to at least get the text to load in.

[[Install]][raw-BFMW]

---
-->

## Issues
Please report any issues within this repository's [issue section](https://github.com/StaticPH/Userscripts/issues)

<!-- Link References -->
<!-- Format
[raw-ABBREVIATION]: raw url of script on Github/Gist/wherever

[gf-ABBREVIATION]: url of script on GreasyFork

[ou-ABBREVIATION]: url of script on OpenUserJS
-->
[raw-HYOA]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/hide_youtube_overlay_ads.user.js
[raw-FYPBG]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/fix_youtube_player_bottom_gradient.user.js
[raw-THCL]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/twitch_hide_channel_leaderboard.user.js
[raw-TTVS]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/twitch_transparent_video_stats.user.js
[raw-GRNT]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/github_repo_network_tab.user.js
[raw-BGNG]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/bigger_github_network_graph.user.js
[raw-GNPT]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/github_notification_page_tweaks.user.js
[raw-GSEH]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/github_sticky_editor_header.user.js
[raw-GDIT]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/gitlab_description_in_title.user.js
[raw-PLPC]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/prettier_librs_preformatted_code.user.js
[raw-LDIT]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/librs_description_in_title.user.js
[raw-CDIT]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/cratesio_description_in_title.user.js
[raw-RNNF]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/roll20_character_sheet_no_scrolling_number_fields.user.js
[raw-CGTN]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/centered_gmail_toast_notifications.user.js
[raw-BBBI]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/bypass_blogspots_blogger_iframe.user.js
[raw-Foxf]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/foxaholic_fixes.user.js
[raw-WGFF]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/wider_google_form_fields.user.js
[raw-GFCC]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/correct_google_form_correctness.user.js
[raw-MTBR]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/mitigate_target_blank_risk.user.js
[raw-MDIT]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/msys2_package_description_in_title.user.js


[raw-GPOFCB]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/github_pr_fork_compare_button.user.js
[raw-CCMNT]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/cratesio_meta_near_top.user.js
[raw-BFMW]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/brute_force_medium_workaround.user.js

[ViolentMonkey_src]: https://github.com/violentmonkey/violentmonkey/releases
[ViolentMonkey_Firefox]: https://addons.mozilla.org/firefox/addon/violentmonkey/
[ViolentMonkey_Chrome]: https://addons.mozilla.org/firefox/addon/violentmonkey/
[ViolentMonkey_Edge]: https://addons.mozilla.org/firefox/addon/violentmonkey/
[GreaseMonkey_v3_Moonchild]: https://github.com/janekptacijarabaci/greasemonkey/releases
