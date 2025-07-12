#! /bin/sh

# To "register" a new userscript, add a new object with `path` and `anchorString` values to the `scripts` array in `main_script_manifest.json`; the updater python script will do the rest.
case "$1" in
	-h|--help)
		printf '%s\n' \
			'This script is used to generate updated versions of readme and manifest files.' \
			'To "register" a new userscript for inclusion in the readme, add a new'  \
			'object with both `path` and `anchorString` values to the `scripts` array' \
			'in `main_script_manifest.json` before running this script.' \
			'Updated manifest and readme files will be created in the `build` directory,' \
			'and named `newdata.json` and `output.md`, respectively.' \
			'They can be manually copied over the originals.'
			exit 0
		;;
esac

repoRoot="$(git rev-parse --show-toplevel)"
dataDir="${repoRoot}/build/data_files"
templateDir="${repoRoot}/build/templates"

pushd "${repoRoot}/build" >/dev/null 2>&1

TEST_READER=1 python3 "${repoRoot}/build/update_script_manifest.py"
jq -rs 'reduce .[] as $item ({}; . * $item)' "${dataDir}/general_url_references.json" "${dataDir}/legacy_scripts.json" newdata.json | \
	minijinja-cli --format json "${templateDir}/primary_template.md.j2" - > output.md

popd >/dev/null 2>&1
################
################
# TODO:
# 1) Pad the script table such that it still looks decent as markdown, without needing me to align things manually
################
################
