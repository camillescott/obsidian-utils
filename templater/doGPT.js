var lib = require(app.vault.adapter.basePath + '/src/common.js');

async function doGPT(tp, text, prompt_name, max_len=10000) {
	console.log('use prompt: ' + prompt_name);
	const prompt = (await lib.getPrompt(prompt_name)) + text;
	console.log('doGPT prompt: ' + prompt);
	result = (await tp.ai.chat(prompt.substring(0, max_len)));
	console.log('doGPT result: ' + result);
	return result;
}

module.exports = doGPT;
