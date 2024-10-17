var lib = require(app.vault.adapter.basePath + '/src/common.js');

async function suggestTitles(tp, content) {
	const prompt = (await lib.getPrompt('generate-titles')) + content;
	const response = await tp.ai.chat(prompt);
	const titles = response.split('\n').filter(item => item !== "");
	console.log(response);
	console.log(titles);
	const suggested = await tp.system.suggester(titles.concat('Manual'), 
																						  titles.concat(null));
	console.log(suggested);
	if (suggested === null) {
		return await tp.system.prompt("Primary Alias: ");
	} else {
		return suggested;
	}
}

module.exports = suggestTitles;
