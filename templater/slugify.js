var lib = require(app.vault.adapter.basePath + '/src/common.js');

function slugify(string) {
	return lib.slugify(string);
}

module.exports = slugify;
