parent_key = input;
root = dv.current();
await dv.list(await dv.pages()
                      .filter(page => parent_key in page)
                      .filter(page => root["aliases"].includes(page[parent_key]))
                      .map(page => dv.fileLink(page.file.path, false, page.aliases[0])));

