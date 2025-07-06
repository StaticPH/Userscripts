#! /bin/sh

repoRoot="$(git rev-parse --show-toplevel)"
dataDir="${repoRoot}/build/data_files"
templateDir="${repoRoot}/build/templates"

# To "register" a new userscript, add a new object with `path` and `anchorString` values to the `scripts` array in `main_script_manifest.json`; the updater python script will do the rest.

TEST_READER=1 python3 "${repoRoot}/build/update_script_manifest.py"
jq -rs 'reduce .[] as $item ({}; . * $item)' "${dataDir}/general_url_references.json" "${dataDir}/legacy_scripts.json" newdata.json | \
	minijinja-cli --format json "${templateDir}/primary_template.md.j2" - > output.md

################
################
# TODO:
# 1) Pad the script table such that it still looks decent as markdown, without needing me to align things manually
################
################
