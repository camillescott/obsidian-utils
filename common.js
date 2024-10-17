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

const DEFAULT_PROMPT = 
`
Generate a very brief (50 words or less, no more than 3 bullet points)
summary of the following text, for use in a personal notebook:
`;

async function getPrompt(prompt_name) {
    prompt = (await app.vault.read(app.vault.getFileByPath('src/prompts/' + prompt_name)));
    return prompt || DEFAULT_PROMPT;
}

exports.getPrompt = getPrompt;
