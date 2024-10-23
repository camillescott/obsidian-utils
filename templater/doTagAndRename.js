async function doTagAndRename(tp, text, default_title="") {
	const tags = await tp.user.generateTags(tp, text);
	const primary_alias = await tp.user.suggestTitles(tp, text, default_title);
	tp.user.renameFromAlias(tp, primary_alias);
	tp.user.updateTags(tp, tags);
}

module.exports = doTagAndRename;
