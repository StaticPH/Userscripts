This file contains instructions for using the readme automation in this directory, and also a todo list.

# Instructions
## Prerequisites
The following tools must be available on the `PATH`:
 * Python (minimum version: 3.7)
 * [MiniJinja CLI](https://github.com/mitsuhiko/minijinja)
 * [jq](https://github.com/stedolan/jq)
 * Bash/Zsh/Ksh/other-sh-interpreter
 * git

# What the hell do I do with any of this?
Run `./run.sh --help` for instructions on what needs to be done manually
when adding a new userscript.

Otherwise, run `./run.sh`, then manually compare:
 * `./data_files/main_script_manifest.json` <-> `./new_main_manifest.json`
 * `./data_files/legacy_scripts.json` <-> `./new_legacy_manifest.json`
 * `../README.md` <-> `./output.md`
If satisfied, move/copy the right-hand files to the (version-controlled)
left-hand files.

Then add the changes and commit.

# TODO list
1. [X] The updater script, templates, and data files should reside under a directory named something like `build` or `deploy`

2. [X] Clear fucking instructions on how to run this shit.

    1. [X] How should the updater know which userscript files to check for updates?
        Currently it only checks files specified in the data files.
    2. [X] I don't believe the script currently understands how to read from multiple separate data files; should it?
        Script now reads and updates both the main and legacy script manifests separately.
        Support has been added for alternate keys to access the list of scripts in a file,
        as the legacy manifest uses 'legacy_scripts', while the main manifest uses 'scripts'.

    Running `./update_script_manifest.py` with Python3.7 or later and the
    non-empty environment variable `WRITE_FILES` will produce updated
    `new_main_manifest.json` and `new_legacy_manifest.json` from
    `data_files/main_script_manifest.json` and `data_files/legacy_scripts.json`.
    The updated readme can then be written to `output.md` by running:
```bash
jq -rs 'reduce .[] as $item ({}; . * $item)' 'data_files/general_url_references.json' new_legacy_manifest.json new_main_manifest.json |
minijinja-cli --format json templates/primary_template.md.j2 - > output.md
```

**For convenience, simply run `./run.sh`**

3. [ ] Automatically display (?git-?)diff of data file after running updater script.

    1. [-] Do I want to ultimately want to write back to the original data file, or should I write to a temporary file, then compare them,
       and prompt for confirmation before overwriting the original? What if I want only part of the changes?
        Currently all outputs go to temporary files that must be manually checked, copied (if good), and cleaned up.

4. [X] If the metadata block of a script doesn't contain the non-standard `@createdAt` property,
    and the script doesn't already have a `created` value in the data file,

    _EITHER_
    1. Attempt to check the creation and modified date of the script file according to the file system. Keep the older of the two.
    2. Call out to git to determine when the script was first added to the repository.
    3. Set the earlier of the two as the `created` value in the data file.

    _OR_

    set the `created` value in the data file to the current date.

    The first scenario seems preferable, but in the interest of speed and
    convenience, the second option is employed.

5. [ ] Support automatic detection of version-controlled scripts not yet in a data file, and automatically add them to the appropriate one.
    This should also handle adding the `created` date if necessary.

6. [ ] Decide on some process to automatically assign an `anchorString`.
    Consider ditching custom anchor strings entirely in favor of just using the name of the script file, sans extension.
    `pandoc` might be of use here, depending on the exact behavior of [extension: `auto_identifiers`](https://pandoc.org/MANUAL.html#extension-auto_identifiers)

7. [ ] Figure out what part of `getUpdatedScriptData` can be replaced with a call to `dict.update()`.

8. [ ] Investigate converting some part of `findScriptData` into a generator.

9. [ ] Vendor icons into a repo (Projects/third_party/asset_archive) (Projects/Userscripts/notes/icon_index.txt)
    1. [ ] Add some kind of disclaimer section mentioning that site names and logos are property of their original owners.

10. [ ] Group scripts under collapsible `section`/`detail` tags according to the sites they affect.
    1. [ ] Support a *manually added* `group` property in the data files to denote a named group; scripts without (a non-empty, non-null value for) this property should be under an "ungrouped" group, and appear only after all other groups.

11. [X] Temporary local branch in which to test repository layout with new automation files included.

12. [X] Finish/fix date parsing and conversion for the non-standard `createdAt` property in script metadata, so that it can be stored *sensibly* in the manifest.

13. [ ] Although I'm not using `pandoc` at this time, apparently it's default markdown variant expects a blank line before headings (other than at the start of the document). Might want to try changing the format of script details in the readme template, which currently has a named anchor on the line before each script's heading. See [`pandoc` markdown extension: `blank_before_header`](https://pandoc.org/MANUAL.html#extension-blank_before_header)
