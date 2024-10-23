var lib = require(app.vault.adapter.basePath + '/src/common.js');

async function generateTags(tp, text) {
	const prompt = (await lib.getPrompt('generate-tags')) + text;
	console.log('generateTags prompt: ' + prompt);
	const tags = await tp.ai.chat(prompt);
	console.log('generateTags response: ' + tags);
	return tags;
}

module.exports = generateTags;
