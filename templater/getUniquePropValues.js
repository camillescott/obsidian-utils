var lib = require(app.vault.adapter.basePath + '/src/common.js');

function getUniquePropValues(key) {
	return lib.getUniquePropValues(key);
}

module.exports = getUniquePropValues;
