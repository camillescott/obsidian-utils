var lib = require(app.vault.adapter.basePath + '/src/common.js');

async function suggestTitles(tp, content, default_title="") {
	const prompt = (await lib.getPrompt('generate-titles')) + content;
	const response = await tp.ai.chat(prompt);
	const titles = response.split('\n').filter(item => item !== "");
	if (default_title !== "") {
		titles.unshift(default_title);
	}
	console.log(response);
	console.log(titles);
	const suggested = await tp.system.suggester(titles.concat('Manual'), 
																						  titles.concat(null));
	console.log(suggested);
	if (suggested === null) {
		return await tp.system.prompt("Primary Alias: ", default_title);
	} else {
		return suggested;
	}
}

module.exports = suggestTitles;
