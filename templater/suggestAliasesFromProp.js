var lib = require(app.vault.adapter.basePath + '/src/common.js');
var SuggestStatus = lib.SuggestStatus;

async function suggestAliasesFromProp(tp, prop, value, placeholder=null) {
  let dv = app.plugins.plugins.dataview.api;
	
	let query = typeof value == 'string' ? [value] : value;
  function filterfunc(page) {
		if (!(prop in page)) {
			return false;
		}
		prop_values = [].concat(page[prop]);
		for (query_value of query) {
			if (prop_values.includes(query_value)) {
				return true;
			}
		}
		return false;
	}

	const values = 	dv.pages()
		.filter(filterfunc)
		.map(p => "aliases" in p && p.aliases[0])
	  .distinct()
		.sort()
	  .array();

	return await lib.suggest(tp, values, query.join("|"));

	const suggested = await tp.system.suggester(
		values.concat(SuggestStatus.NEW, SuggestStatus.NONE),
		values.concat(SuggestStatus.NEW, SuggestStatus.NONE),
		false,
		placeholder === null ? prop + ': ' + value : placeholder
	);

	if (suggested == SuggestStatus.NEW) {
		return await tp.system.prompt("New " + value + ": ", "");
	} else if (suggested == SuggestStatus.NONE) { 
		return "";
	} else {
		return suggested;
	}
}

module.exports = suggestAliasesFromProp;
