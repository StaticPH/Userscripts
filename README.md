# StaticPH's Userscripts
[![HitCount](http://hits.dwyl.com/StaticPH/Userscripts.svg)](http://hits.dwyl.com/StaticPH/UserScripts)
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
* If you use [Pale Moon](http://www.palemoon.org/) or [Basilisk](https://www.basilisk-browser.org), try [this fork of GreaseMonkey v3][GreaseMonkey_v3_Moonchild]


---
To add a script:
* Install a script directly from GitHub by clicking on the "install" link in the table below.
* Install a script from GreasyFork (GF) from the userscript site page
* Or, install the scripts from OpenUserJS (OU).

| Userscript<br>Description                  | Direct<br>Install   | Sites               | Supports<br>Auto-Update | License | Created    | Updated    |
|--------------------------------------------|:-------------------:|:-------------------:|:-----------------------:|:-------:|:----------:|:----------:|
| [Hide YouTube Overlay Ads](#HYOA)          | [install][raw-HYOA] | N/A                 | :heavy_check_mark:      | MIT     | 2020:04:04 | 2020:10:27 |
| [Github Repo Network Tab](#GRNT)           | [install][raw-GRNT] | N/A                 | :heavy_check_mark:      | MIT     | 2020:04:06 | 2020:03:30 |
| [Bigger Github Network Graph](#BGNG)       | [install][raw-BGNG] | N/A                 | :heavy_check_mark:      | MIT     | 2020:04:12 | 2020:04:12 |
| [Github Notification Page Tweaks](#GNPT)   | [install][raw-GNPT] | N/A                 | :heavy_check_mark:      | MIT     | 2020:10:22 | 2021:03:30 |
| [Prettier Lib.rs Preformatted Code](#PLPC) | [install][raw-PLPC] | N/A                 | :heavy_check_mark:      | MIT     | 2020:07:05 | 2021:03:30 |
| [Roll20 Nonscrolling Number Fields](#RNNF) | [install][raw-RNNF] | N/A                 | :heavy_check_mark:      | MIT     | 2021:01:23 | 2021:04:05 |
| [Twitch Hide Channel Leaderboard](#THCL)   | [install][raw-THCL] | N/A                 | :heavy_check_mark:      | MIT     | 2020:06:19 | 2021:03:30 |
| [Centered Gmail Toast Notifications](#CGTN)   | [install][raw-CGTN] | N/A                 | :heavy_check_mark:      | MIT     | 2020:06:19 | 2021:03:30 |
| [Fix Youtube Player Bottom Gradient](#FYPBG)   | [install][raw-FYPBG] | N/A                 | :heavy_check_mark:      | MIT     | 2021:02:26 | 2021:03:30 |
| [Crates.io Description In Title](#CDIT)   | [install][raw-CDIT] | N/A                 | :heavy_check_mark:      | MIT     | 2021:03:16 | 2021:04:23 |
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

You know those little overlay advertisements that pop up on the bottom center of YouTube videos? If those really annoy you, this simple userscript (really just a userstyle wrapped into a userscript) will help by simply preventing them from rendering.
Note that this _does not_ affect other ads.
[[Install]][raw-HYOA]

---

### Github Repo Network Tab <a name="GRNT"></a>

Adds a navigation tab for faster access to the 'Network' page of a repository.
[[Install]][raw-GRNT]

Known bugs:
- Occasionally the tab fails to be added, with no clear explanation or pattern. If this occurs, simply reload the page.
- When switching between repository tabs, the network tab often disappears, and something about the way Github does page navigation within a repository doesn't cause this script to be re-injected. Short of constantly checking state on a sub-second timer, or using a mutation observer, I don't know how else to solve this.

---

### Bigger Github Repo Network Graph <a name="BGNG"></a>

Makes the timeline on the Network page of Github repositories utilize more of that available whitespace on the sides. <br>
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

### Prettier Lib.rs Preformatted Code <a name="PLPC"></a>

Makes `<pre><code>` blocks on lib.rs look more like they do on crates.io; lib.rs is so much faster thanks to reduced JS use, but it's not as pretty.

[[Install]][raw-PLPC]

---

### Roll20 Nonscrolling Number Fields <a name="RNNF"></a>

This should disable changing the value of any numeric fields on Roll20 character sheets by scrolling. <br>
TODO: Wrap my head around how mutation observers work, and replace the use of setTimeout with one of those.

[[Install]][raw-RNNF]

---

### Twitch Hide Channel Leaderboard <a name="THCL"></a>

Hides the stupid channel leaderboard on Twitch.tv stream chat. <br>
Extensions like FrankerFaceZ may already have this functionality.

[[Install]][raw-THCL]

---

### Centered Gmail Toast Notifications <a name="CGTN"></a>

Do you hate that Gmail shows a toast notification that blocks functional regions of the UI after you do something to any email? Me too! <br>
This little change should help mitigate the problem by moving the toast notification to the bottom center of the screen.

[[Install]][raw-CGTN]

---

### Fix Youtube Player Bottom Gradient <a name="FYPBG"></a>

This "fixes" the excessively large bottom gradient area that sometimes appears on the YouTube video player when the mouse cursor is within the player frame. <br>
**So far, I've only seen the phenomenon that led me to write this while using Vivaldi.**

[[Install]][raw-FYPBG]

---

### Crates.io Description In Title <a name="CDIT"></a>

Replace the unhelpful part of the tab title on a crate.io crate's page with the short description of the crate, if one is provided. <br>
Convenient for bookmarking and tab-saving extensions, as pages are typically stored according to their titles.

[[Install]][raw-CDIT]

---
<!--

### Github PR Obvious Fork Compare Button <a name="GPOFCB"></a>

Makes it a little more obvious on the page for comparing Github branches that "compare across forks" acts like a button. <br>
The default look gives the impression that it's a link to documentation, and for the life of me I never remember it isn't.

[[Install]][raw-GPOFCB]

---

### Crates.io Common Meta Near Top <a name="CCMNT"></a>

When I visit a crate's page on crates.io, the first things I want to see are the crate name, short description, 
associated categories and keywords, the time since the most recent release, and a link to the crate's source code if it is public. <br>
I don't know if I'm the only one, but in my mind, it only makes sense for those to be in the same place.

[[Install]][raw-CCMNT]

---

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
[raw-GRNT]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/github_repo_network_tab.user.js
[raw-BGNG]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/bigger_github_network_graph.user.js
[raw-GNPT]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/github_notification_page_tweaks.user.js
[raw-PLPC]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/prettier_librs_preformatted_code.user.js
[raw-RNNF]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/roll20_character_sheet_no_scrolling_number_fields.user.js
[raw-THCL]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/twitch_hide_channel_leaderboard.user.js
[raw-CGTN]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/centered_gmail_toast_notifications.user.js
[raw-GPOFCB]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/github_pr_fork_compare_button.user.js
[raw-FYPBG]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/fix_youtube_player_bottom_gradient.user.js
[raw-CDIT]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/cratesio_description_in_title.user.js
[raw-CCMNT]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/cratesio_meta_near_top.user.js
[raw-BFMW]: https://raw.githubusercontent.com/StaticPH/Userscripts/master/brute_force_medium_workaround.user.js

[ViolentMonkey_src]: https://github.com/violentmonkey/violentmonkey/releases
[ViolentMonkey_Firefox]: https://addons.mozilla.org/firefox/addon/violentmonkey/
[ViolentMonkey_Chrome]: https://addons.mozilla.org/firefox/addon/violentmonkey/
[ViolentMonkey_Edge]: https://addons.mozilla.org/firefox/addon/violentmonkey/
[GreaseMonkey_v3_Moonchild]: https://github.com/janekptacijarabaci/greasemonkey/releases
