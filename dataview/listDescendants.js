const lib_path = require.resolve(app.vault.adapter.basePath + '/src/common.js');
delete require.cache[lib_path];
var lib = require(lib_path);

if (input) {
	note_type = input;
} else {
	note_type = dv.current()["note.type"];
}

parent_key = note_type + ".parent";
sub_type = note_type + ".type";

var descendants = await lib.findDescendants(dv, parent_key);

for (let group of dv.array(descendants).groupBy(p => p[sub_type])) {
	await dv.header(3, lib.capitalize(group.key) + "s");
	await dv.list(group.rows
		            .sort(p => p.name)
		 						.map(p => dv.fileLink(p.file.path, false, p.aliases[0])));
}

