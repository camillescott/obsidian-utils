function fileAliases(tp, file) {
	const frontmatter = app.metadataCache.getFileCache(file).frontmatter;
	if (frontmatter) {
		const aliases = tp.obsidian.parseFrontMatterAliases(frontmatter);
		if (aliases) {
			return aliases;
		}
	}
	return null;
}

function fileAliasOrBasename(tp, file) {
	const aliases = fileAliases(tp, file);
	return aliases ? aliases[0] : file.basename;
}

function fileWikiLink(tp, file) {
	const aliases = fileAliases(tp, file);
	if (aliases) {
		return '[[' + file.basename + '|' + aliases[0] + ']]';
	} else {
		return '[[' + file.basename + ']]';
	}
}

async function suggestFilesWithTag(tp, tag, placeholder) {
	const files = tp.user.getFilesWithTag(tp, tag);
	const selected = (await tp.system.suggester((file) => fileAliasOrBasename(tp, file), files, false, placeholder));
	return fileWikiLink(tp, selected);
}

module.exports = suggestFilesWithTag;
