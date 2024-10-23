function updateFrontMatter(tp, key, value) {
  tp.hooks.on_all_templates_executed(async () => {
    const file = tp.file.find_tfile(tp.file.path(true));
    await app.fileManager.processFrontMatter(file, (frontmatter) => {
			if (value instanceof Array && frontmatter[key]) {
				frontmatter[key].push(...value);
			} else {
				frontmatter[key] = value;
			}
    });
  });
}

module.exports = updateFrontMatter;
