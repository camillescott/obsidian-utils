var lib = require(app.vault.adapter.basePath + '/src/common.js');

function renameFromAlias(tp, alias) {
  const slug = lib.slugify(alias);
  tp.hooks.on_all_templates_executed(async () => {
    const file = tp.file.find_tfile(tp.file.path(true));
    await app.fileManager.processFrontMatter(file, (frontmatter) => {
      frontmatter["title"] = alias;
      frontmatter["aliases"] = [alias];
    });
    await tp.file.rename(slug); 
  });
  return slug;
}

module.exports = renameFromAlias;
