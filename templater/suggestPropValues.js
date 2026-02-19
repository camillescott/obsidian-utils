var lib = require(app.vault.adapter.basePath + '/src/common.js');

async function suggestPropValues(tp, key) {
	const values = await tp.user.getUniquePropValues(key);
	return await lib.suggest(tp, values, key);
}

module.exports = suggestPropValues;
