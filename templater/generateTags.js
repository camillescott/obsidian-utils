var lib = require(app.vault.adapter.basePath + '/src/common.js');

async function generateTags(tp, text) {
	const prompt = (await lib.getPrompt('generate-tags')) + text;
	return await tp.ai.chat(prompt);
}

module.exports = generateTags;
