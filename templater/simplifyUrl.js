async function simplifyContentFromUrl(tp, url) {
	const simplifier_url = "https://earthly-tools.com/text-mode?url=" + url;
	console.log(simplifier_url);
	const simplified = await tp.obsidian.requestUrl(simplifier_url);
	console.log(simplified.text);
	return simplified.text;
}

module.exports = simplifyContentFromUrl;
