function getFilesWithTag(tp, tag) {
	if (!tag.startsWith('#')) tag = '#' + tag;
	const filteredFiles = app.vault.getMarkdownFiles().filter(file => {
  	const tags = tp.obsidian.getAllTags(app.metadataCache.getFileCache(file));
  	return tags.includes(tag);
	});
	return filteredFiles;
}

module.exports = getFilesWithTag;
