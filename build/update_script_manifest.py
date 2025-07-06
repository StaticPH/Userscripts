#! python3

from __future__ import annotations
from typing import Dict, Union, Tuple, List, Any

import json
import sys
import itertools
import os
import datetime

JSON_Value_Type = Union[Dict[str, Any], int, List[Any], str, bool]

# noinspection PyUnusedLocal
def mayPrint(*args, **kwargs) -> None: #noqa: ARG001,ANN002,ANN003, RUF100 # pyright: ignore[reportUnknownParameterType,reportMissingParameterType,reportUnusedParameter]
	"""Print the arguments to stderr, if this was called as a standalone script with the DEBUG environment variable set.
	Without the environment variable being set, this should be a no-op.
	When the environment variable is set, this function is intended to be equivalent to:
		`print(*args, **kwargs, file=sys.stderr)`
	"""
	pass

### See: https://peps.python.org/pep-0597/
### This may instead need to be replaced with always forcing UTF-8 without exception, depending on what characters end up being used in my README.
# Apparently this can't be __defaultFileEncoding because something stupid tells the interpreter that it must be a class member then???
defaultFileEncoding = 'locale'
if sys.version_info < (3, 10):
	from locale import getpreferredencoding
	defaultFileEncoding = getpreferredencoding(False) or sys.getdefaultencoding()

__dateOutputFmtStr = '%b %d, %Y' # ex: Sep 08, 2024
scriptStartTime = datetime.datetime.utcnow()
def fmtDateForDisplay(date: datetime.datetime) -> str:
	dateStr = date.astimezone(datetime.timezone.utc).strftime(__dateOutputFmtStr)
	# Use a space to left-pad single-digit days, rather than a zero
	if dateStr[4] == '0':
		dateStr = dateStr[0:4] + ' ' + dateStr[5:]
	return dateStr

def parseSlashedDateTime(date: str) -> datetime.datetime:
	# If there's multiple parts to a datetime string,
	# assume the string takes the form "%m/%d/%Y, %H:%M:%S %p",
	# because that's how it's usually written in America for some reason.
	# For simplicity, just truncate at the first comma if one exists.
	# This is the case with substitutions for `{{date}}` in ViolentMonkey's script template,
	# which are formatted BY DEFAULT as `%d/%m/%Y, %I:%M:%S %p`.
	# Dates are adjusted to be relative to UTC.
	if ',' in date:
		date = date.split(',', maxsplit=1)[0]
	return datetime.datetime.strptime(date, '%m/%d/%Y').astimezone(datetime.timezone.utc)

# FIXME: Consider whether this ought to be a dataclass, or maybe if it should take str as its parent type
class VersionString:
	"""
	Class for more-or-less naive version string comparison.
	Version strings follow a similar structural scheme to SemVer and CalVer.
	Version strings are expected to be composed of either two or three numbers (values, not characters), separated by a period (".")
	These numbers, from left-to-right, represent the major, minor, and patch version numbers for the string, respectively.
	"""

	# TODO: Support optional suffix, such as "experimental", "alpha", "unstable", etc.
	def __init__(self, value: str):
		if not isinstance(value, str):
			errmsg = 'Argument must be a string.'
			raise TypeError(errmsg)
		if len(value.strip()) == 0: # This could be more thorough, but it's not like I'm going to deliberately put a ZWJ in a version string...
			errmsg = 'Argument cannot be a blank string.'
			raise ValueError(errmsg)
		if value.count('.') > 2: #noqa: PLR2004
			errmsg = f'Too many segments in string "{value}"'
			raise ValueError(errmsg)

		(major, minor, *patch) = value.split(sep='.', maxsplit=2)
		# If patch unpacked as a non-empty list, it must be a list of length 1, and that singular value should be used. Otherwise, patch is an empty list, and should be set to '0'.
		patch = '0' if len(patch) == 0 else patch[0]
		if (len(major) == 0 or len(minor) == 0):
			errmsg = 'Argument must consist of at least two digits separated by a period (e.g. "1.7")'
			raise ValueError(errmsg)
		if not (major.isdigit() and minor.isdigit() and (patch.isdigit())):
			errmsg = f'"{value}" contains one or more invalid characters.'
			raise ValueError(errmsg)
		self.major: int = int(major, 10)
		self.minor: int = int(minor, 10)
		self.patch: int = int(patch, 10) or 0
		self.originalValue: str = value
		self.value: str = value + '.0' if patch == '' else value

	def __str__(self) -> str:
		return self.value

	def __hash__(self) -> int:
		return hash(self.value)

	def asTuple(self) -> Tuple[int, int, int]:
		return (self.major, self.minor, self.patch)

	@staticmethod
	def __asVersionString(value: Union[str, VersionString]) -> VersionString:
		if isinstance(value, str):
			return VersionString(value)
		if isinstance(value, VersionString):
			return value
		else: #noqa: RET505
			errmsg = f'Unable to parse "{value}" as a VersionString.'
			raise TypeError(errmsg)

	def __eq__(self, value: Union[str, VersionString]) -> bool:
		if isinstance(value, str):
			return value in (self.value, self.originalValue)
		if isinstance(value, VersionString):
			return value.value in (self.value, self.originalValue)
		else: #noqa: RET505
			errmsg = f'Unable to parse "{value}" as a VersionString.'
			raise TypeError(errmsg)

	def __ne__(self, value: Union[str, VersionString]) -> bool:
		return not self == value

	def __lt__(self, value: Union[str, VersionString]) -> bool:
		operand = self.__asVersionString(value)
		return (self.major, self.minor, self.patch) < (operand.major, operand.minor, operand.patch)

	def __gt__(self, value: Union[str, VersionString]) -> bool:
		operand = self.__asVersionString(value)
		return (self.major, self.minor, self.patch) > (operand.major, operand.minor, operand.patch)

	def __le__(self, value: Union[str, VersionString]) -> bool:
		return not self < value

	def __ge__(self, value: Union[str, VersionString]) -> bool:
		return not self < value


class DataUpdater:
	metadataKeysInTemplateData: Tuple[str, ...] = (
		'name', 'createdAt', 'version', 'license', 'description', 'downloadURL', 'updateURL'
	)
	metadataOutputOrder: Tuple[str, ...] = (
		'name', 'anchorString', 'path', 'license', 'autoUpdates', 'created', 'updated', 'desc', 'version'
	)
	_missingDescValue: str = 'Description not provided'
	_missingCreatedValue: str = fmtDateForDisplay(scriptStartTime)
	_missingLicenseValue: str = 'No license found'
	_missingVersionValue: str = '0.1.0'

	def __init__(self): #noqa: ARG002, RUF100
		self.dataFileContents: Dict[str, JSON_Value_Type] = {}

	## Steps to use:
	#  1) init
	#  2) readJSONFile/readJSONStr/readJSONDict; how the file will be designated is TBD
	#  3) findScriptData
	#  4) ensure the updated script data file is correct
	#  5) combine this whole script with use of minijinja to keep my Userscripts repo README up-to-date without manually managing dates and shit.
	#  6) Rejoice! \o/

	def readJSONDict(self, data: Dict[str, JSON_Value_Type]) -> None:
		self.dataFileContents = data
	def readJSONFile(self, filepath: str) -> None: # dict[Any, Any]:
		with open(filepath, 'r', encoding=defaultFileEncoding) as inputFile:
			dataDict = json.load(inputFile)
			self.readJSONDict(dataDict)
	def readJSONStr(self, dataStr: str) -> None:
		"""Read arbitrary stringified JSON objects."""
		dataDict = json.loads(dataStr)
		self.readJSONDict(dataDict)

	def sortScriptMeta(self, meta: Dict[str, Union[str, bool]]) -> Dict[str, Union[str, bool]]:
		# This function requires Python 3.7 or newer due to guaranteed ordered dictionaries.
		# Otherwise, OrderedDict would be needed.

		# Sort expected keys
		sortedDict = {k: meta[k] for k in self.metadataOutputOrder}
		# Retain and append any unexpected keys
		sortedDict.update(meta)
		return sortedDict

	def getMetaFromScriptFile(self, filepath: str) -> Dict[str, Union[str, bool]]:
		"""Extract pertinent metadata from a userscript file."""

		with open('.' + filepath, 'r', encoding=defaultFileEncoding) as scriptFile:
			### Get all lines in the metadata block at the start of the script file.
			fullMetaData = itertools.takewhile(lambda s: s.startswith('//'), scriptFile.readlines())
			### Trim the first two characters ('//') from the start of each line read, then strip whitespace from both ends.
			fullMetaData = (line[2:].strip() for line in fullMetaData)
			### Discard lines without the leading '@', which are ignored by userscript managers when parsing script metadata.
			fullMetaData = filter(lambda line: line[0] == '@', fullMetaData)
			### Strip the leading '@', and split each line into a key-value pair.
			fullMetaData = (line[1:].split(maxsplit=1) for line in fullMetaData)
			### Generate a dict from the subset of metadata that is pertinent to the template data.
			metaDict = {metaPair[0]: metaPair[1] for metaPair in fullMetaData if metaPair[0] in self.metadataKeysInTemplateData}
			### Note whether the script has the information it needs in order to check for and fetch updates.
			metaDict['autoUpdates'] = bool(metaDict.get('updateURL') and metaDict.get('downloadURL'))
			metaDict.pop('updateURL') # Discard
			metaDict.pop('downloadURL') # Discard
			### Rename keys to match their counterpart in the template data file. FIXME: These really ought to just use the same key... But maybe it's actually fine, since these are keys that aren't mandatory for userscripts...
			renames = (
				('created', metaDict.pop('createdAt', self._missingCreatedValue)),
				('desc', metaDict.pop('description', self._missingDescValue)),
			)
			metaDict.update(renames)
			return metaDict

	@staticmethod
	def __needsAttrForDataFile(script: Dict[str, Union[str, bool]], attrName: str) -> bool:
		# Other possible method names: isScriptAttrUsable, hasUsefulMetaAttrFromDataFile, needsMetaAttrForDataFile, needsMetaAttrFromScriptFile, doesDataFileNeedMetaFromScript
		return (attrName not in script) or (not script[attrName]) or (f'{script[attrName]}'.strip() == '')

	def getUpdatedScriptData(self, scriptFileMeta: Dict[str, Union[str, bool]], scriptItem: Dict[str, str]) -> Dict[str, Union[str, bool]]:
		### This could, and SHOULD, happen directly within findScriptData,
		### but it's been extracted for better readability at the cost of some runtime performance penalties.
		### Come to think of it, a good part of this code could probably be replaced with a call to dict.update()
		# Any name or description in the data file has priority over the script file's metadata.
		if self.__needsAttrForDataFile(scriptItem, 'desc'):
			# Get description field from script file's metadata if the template data file doesn't have one already.
			# The `or` case in this assignment will likely be removed in favor of having minijinja use a default value of "TODO"
			scriptItem['desc'] = scriptFileMeta['desc'] or self._missingDescValue
		if self.__needsAttrForDataFile(scriptItem, 'name'):
			# Get name field from script file's metadata
			scriptItem['name'] = scriptFileMeta['name']
		if self.__needsAttrForDataFile(scriptItem, 'created'):
			# Get createdAt field from script file's metadata.
			scriptItem['created'] = fmtDateForDisplay(parseSlashedDateTime(scriptFileMeta['created']))  # or self._missingCreatedValue
		# TODO: FIXME: If not available, find the date when scriptItem['path'] was first added to repository, or at least the date the file was created.
		if self.__needsAttrForDataFile(scriptItem, 'updated'):
			# Update time defaults to creation time if not set, which should only be the case if the script is new.
			# Ultimately, this clause will likely be disabled in favor of relying on minijinja.
			scriptItem['updated'] = scriptItem['created']
		elif ('version' in scriptItem) and VersionString(scriptItem['version']) < scriptFileMeta['version']:
			# The file's version info was increased since the last time the data file was updated by this script;
			# record the new "updated" date as the current date, and update the "version" to match the script's meta block
			scriptItem['updated'] = self._missingCreatedValue
		if self.__needsAttrForDataFile(scriptItem, 'license'):
			# Get license field from script file's metadata
			scriptItem['license'] = scriptFileMeta['license'] or self._missingLicenseValue
		# Unconditionally update the version field
		scriptItem['version'] = str(VersionString(scriptFileMeta['version'])) or self._missingVersionValue
		# Unconditionally update the autoUpdates field
		scriptItem['autoUpdates'] = scriptFileMeta['autoUpdates'] or 'false'
		return self.sortScriptMeta(scriptItem)

	def findScriptData(self) -> None:
		# Must be called after either `readJSONFile`/`readJSONStr`/`readJSONDict`
		# FIXME: With the large blocks of data this function will eventually be producing and returning,
		#        it would probably make sense to turn this into a Generator method, or at least make the
		#        `for` loop into its own inner-function and make _that_ a Generator.

		adjusted: List[Dict[str, Union[str, bool]]] = []
		for scriptItem in self.dataFileContents['scripts']:
			scriptItem: Dict[str, str] # Shut up linter wrongly complaining that scriptItem is a string.
			if 'path' not in scriptItem:
				# TODO: support automatic detection of version-controlled scripts not in a data file,
				# and add them to the appropriate file;
				# that should ALSO add its "created" date (the date this script was run,
				# or the older of the file's created and modified timestamps).
				errmsg = 'All scripts must have a path!'
				raise KeyError(errmsg)
			if not isinstance(scriptItem['path'], str):
				errmsg = 'scriptItem["path"] must be a string!'
				raise TypeError(errmsg)
			assert isinstance(scriptItem['path'], str) # Shut up linter; we just confirmed that scriptItem['path'] is a string, because if it wasn't, an exception would have been thrown already!
			if scriptItem['path'].strip() == '':
				errmsg = 'scriptItem["path"] cannot be a blank string!'
				raise ValueError(errmsg)
			# TODO: verify scriptItem['path'] is a readable file, and raise FileNotFoundError if necessary...or just try reading it and let errors be handled by the interpreter.

			# Read metadata block from scriptFile, saving useful details to scriptFileMeta
			scriptFileMeta = self.getMetaFromScriptFile(scriptItem['path'])
			# name: <@name>, version: <@version>, desc: <@description | @description:en>, created: <@createdAt>, license: <@license>, ...

			adjusted.append(self.getUpdatedScriptData(scriptFileMeta, scriptItem))
		print(adjusted) # FIXME: Do something with this value other than just print it to stdout.
		self.dataFileContents['scripts'] = adjusted # TEMP

	def writeTest(self) -> None: # TEMP
		with open('newdata.json', 'w', encoding=defaultFileEncoding) as outputFile:
			json.dump(self.dataFileContents, outputFile, indent="\t")
		print('Go diff main_script_manifest.json and newdata.json')

# TODO: ?Decide on some process to automatically assign an anchorString?

if __name__ == '__main__':
	from os import getenv
	from functools import partial

	hasDebugVar: bool = bool(getenv('DEBUG'))
	if hasDebugVar:
		mayPrint = partial(print, file=sys.stderr) #noqa: F811, RUF100

	if bool(getenv('TEST_READER')):
		updater = DataUpdater()
		# TODO: utilize __file__ to make these paths relative to the script, rather than the working directory
		updater.readJSONFile('./data_files/main_script_manifest.json')
		here = os.getcwd()
		os.chdir('..')
		updater.findScriptData()
		os.chdir(here)
		updater.writeTest()
