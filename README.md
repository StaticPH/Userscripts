# StaticPH's Userscripts
[![HitCount](http://hits.dwyl.com/{username}/{repo}.svg)](http://hits.dwyl.com/{username}/{repo})

Unless otherwise specified in their description, all userscripts have been tested with ViolentMonkey on Chromium 72 or later.
They may also work with GreaseMonkey, TamperMonkey, or on other browsers.

* ### Get ViolentMonkey for your browser
	* [Firefox][ViolentMonkey_Firefox]
	* [Google Chrome and (most) Chromium-based browsers][ViolentMonkey_Chrome]
	* [Microsoft Edge (which people apparently use)][ViolentMonkey_Edge]
	* Alternatively, install ViolentMonkey from its [source][ViolentMonkey_src]
<!--
	* <sub>
		Alternatively, you can try installing ViolentMonkey from its <a href="https://github.com/violentmonkey/violentmonkey/releases">source</a> as an unpacked extension in Chrome/Chromium or as a temporary extension in firefox.
	</sub>
-->
* ### Other
	* If you use [Pale Moon](http://www.palemoon.org/) or [Basilisk](https://www.basilisk-browser.org), try [this fork of GreaseMonkey v3][GreaseMonkey_v3_Moonchild]


---
To add a script:
* Install a script directly from GitHub by clicking on the "install" link in the table below.
* Install a script from GreasyFork (GF) from the userscript site page
* Or, install the scripts from OpenUserJS (OU).

| Userscript<br>Description              | Direct<br>Install   | Sites               | Supports<br>Auto-Update | License | Created    | Updated    |
|----------------------------------------|:-------------------:|:-------------------:|:-----------------------:|:-------:|:----------:|:----------:|
| [Hide YouTube Overlay Ads](#HYOA)      | [install][raw-HYOA] | N/A                 | :heavy_check_mark:      | MIT     | 2020.04.04 | 2020:04:04 |
| [Github Repo Network Tab](#GRNT)       | [install][raw-GRNT] | N/A                 | :heavy_check_mark:      | MIT     | 2020.04.06 | 2020:04:06 |
| [Bigger Github Network Graph](#BGNG)   | [install][raw-BGNG] | N/A                 | :heavy_check_mark:      | MIT     | 2020.04.12 | 2020:04:12 |
<!-- | [Script Name](#Page_Anchor)       | [install](link)     | [GF][ref] [OU][ref] | :x:                     | MIT     | yyyy.mm.dd | yyyy.mm.dd | -->
<!-- | [Script Name](#Page_Anchor)       | [install][link_ref] | [GF][ref] [OU][ref] | :question:              | MIT     | yyyy.mm.dd | yyyy.mm.dd | -->

<!-- Script Details -->
<!-- Format BEGIN
### Next script <a name="Anchor_Name"></a>

Description
[[Install]][raw-ABBREVIATION]  <a href="greasyfork_link">[Install from GreasyFork]</a>  <a href="OpenUserJS_link">[Install from OpenUserJS]</a>

---

Format END -->
---

### Hide YouTube Overlay Ads <a name="HYOA"></a>

You know those little overlay advertisements that pop up on the bottom center of YouTube videos? If those really annoy you, this simple userscript will help by simply preventing them from rendering.
Note that this _does not_ affect other ads.
[[Install]][raw-HYOA]

---

### Github Repo Network Tab <a name="GRNT"></a>

Adds a navigation tab for faster access to the 'Network' page of a repository.
[[Install]][raw-GRNT]

Known bugs:
- Occasionally the tab fails to be added, with no clear explanation or pattern. If this occurs, simply reload the page.

---

### Bigger Github Repo Network Graph <a name="BGNG"></a>

Makes the timeline on the Network page of Github repositories utilize more of that available whitespace on the sides. <br>
Still can't seem to make it use all the space on the right side though...

Essentially a subset of [Wide Github](https://github.com/xthexder/wide-github) which, of course, I only realized after I'd written this.
Oh well, someone will probably find this useful.

[[Install]][raw-BGNG]

---

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


[ViolentMonkey_src]: https://github.com/violentmonkey/violentmonkey/releases
[ViolentMonkey_Firefox]: https://addons.mozilla.org/firefox/addon/violentmonkey/
[ViolentMonkey_Chrome]: https://addons.mozilla.org/firefox/addon/violentmonkey/
[ViolentMonkey_Edge]: https://addons.mozilla.org/firefox/addon/violentmonkey/
[GreaseMonkey_v3_Moonchild]: https://github.com/janekptacijarabaci/greasemonkey/releases