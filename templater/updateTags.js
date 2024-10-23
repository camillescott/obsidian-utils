function updateTags(tp, tags, max_tags=8) {
	if (typeof tags === "string" || tags instanceof String) {
		tags = tags.split(" ");
	}
  tags = tags.slice(0, max_tags);
  tp.user.updateFrontMatter(tp, 'tags', tags.map(x => x.replace("#", "")));
}

module.exports = updateTags;
