function updateTags(tp, tags, max_tags=5) {
	if (typeof tags === "string" || tags instanceof String) {
		tags = tags.split(" ");
	}
  tags = tags.slice(0, max_tags);

  tp.hooks.on_all_templates_executed(async () => {
    const file = tp.file.find_tfile(tp.file.path(true));
    await app.fileManager.processFrontMatter(file, (frontmatter) => {
      frontmatter["tags"].push(...tags.map(x => x.replace("#", "")));
    });
  });
}

module.exports = updateTags;
