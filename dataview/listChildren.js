const lib_path = require.resolve(app.vault.adapter.basePath + '/src/common.js');
delete require.cache[lib_path];
var lib = require(lib_path);

parent_key = input;
root = dv.current();
await dv.list(await dv.pages()
                      .filter(page => parent_key in page)
                      .filter(page => lib.hasIntersection(root["aliases"], page[parent_key]))
                      .map(page => dv.fileLink(page.file.path, false, page.aliases[0])));

