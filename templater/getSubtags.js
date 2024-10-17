//function filterByParents(tag, parents) {
//	return tag.startsWith(parents.concat(['']).join('/'));
//}

var lib = require(app.vault.adapter.basePath + '/src/common.js');

function getSubtags(parents) {
  tags = Object.keys(app.metadataCache.getTags()).map(x => x.replace("#", ""));
  return lib.getSubtagsOf(parents, tags).sort();
	//return tags.filter((tag) => filterByParents(tag, parents)).map(tag => tag.split('/').slice(parents.length).join('/'));
}

module.exports = getSubtags;
