var lib = require(app.vault.adapter.basePath + '/src/common.js');

function renameFromAlias(tp, alias) {
  tp.hooks.on_all_templates_executed(async () => {
    const slug = lib.slugify(alias);
    const file = tp.file.find_tfile(tp.file.path(true));
    await app.fileManager.processFrontMatter(file, (frontmatter) => {
      frontmatter["title"] = alias;
      frontmatter["aliases"] = [alias];
    });
    await tp.file.rename(slug); 
  });
}

module.exports = renameFromAlias;
