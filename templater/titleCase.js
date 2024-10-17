var lib = require(app.vault.adapter.basePath + '/src/common.js');

function titleCase(string) {
	return lib.titleCase(string);
}

module.exports = titleCase;
