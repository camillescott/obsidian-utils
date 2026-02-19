function filterByParents(tag, parents) {
	  return tag.startsWith(parents.concat(['']).join('/'));
}
exports.filterByParents = filterByParents;


function getSubtagsOf(parents, tags) {
	  return tags.filter((tag) => filterByParents(tag, parents)).map(tag => tag.split('/').slice(parents.length).join('/'));
}
exports.getSubtagsOf = getSubtagsOf;


function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
}
exports.titleCase = titleCase;


function slugify(string) {
    //return string.toLowerCase().replaceAll(new RegExp('\'|"', 'g'), '').replaceAll(new RegExp('\\s+', 'g'), '-');
    return string.replace(/[\s\-#@!$%^&*()_+=[\]{};:'"\\|,.<>?\/]+/g, '-').replace(/[-]+$/, '').replace(/^[-]+/, '').toLowerCase();
}
exports.slugify = slugify;


function getUniquePropValues(key) {
    let DataviewAPI = app.plugins.plugins.dataview.api;
    let uniqueProperties = [];

    const propValues = DataviewAPI.pages()
      .map(p => p[key]) // Use flatMap to handle multi-value properties (lists/arrays)
      .filter(v => v !== undefined && v !== null) // Filter out notes where the property is missing
      .distinct() // Get only the unique values
      .sort() // Sort alphabetically
      .array();

    propValues.forEach((prop) => {
        if (Array.isArray(prop)) {
            uniqueProperties.push(...prop);
        } else {
            uniqueProperties.push(prop);
        }
    });
    
    return [...new Set(uniqueProperties)]
}
exports.getUniquePropValues = getUniquePropValues;


const SuggestStatus = {
    NEW: ':New:',
    NONE: ':None:'
};
exports.SuggestStatus = SuggestStatus;


async function suggest(tp, values, placeholder) {
	const suggested = await tp.system.suggester(
		values.concat(SuggestStatus.NEW, SuggestStatus.NONE),
		values.concat(SuggestStatus.NEW, SuggestStatus.NONE),
		false,
		placeholder
	);

	if (suggested == SuggestStatus.NEW) {
		return await tp.system.prompt("New " + placeholder + ": ", "");
	} else if (suggested == SuggestStatus.NONE) { 
		return "";
	} else {
		return suggested;
	}
}
exports.suggest = suggest;


function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
exports.capitalize = capitalize;


async function findDescendants(dv, parent_key) {
  var desc = [];
  var queue = [dv.current()];
  var pages = await dv.pages().filter(page => parent_key in page);
  while (queue.length > 0) {
    var root = queue.pop();
    var reduced = [];
    await pages.forEach((page) => {
      if (root.aliases.includes(page[parent_key])) {
        queue.push(page);
        desc.push(page);
      } else {
        reduced.push(page);
      }
    });
    pages = dv.array(reduced);
  }

  return desc;
}
exports.findDescendants = findDescendants;
