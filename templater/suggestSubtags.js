async function suggestSubtags(tp, parents, placeholder) {
	tags = tp.user.getSubtags(parents);
	return (await tp.system.suggester((tag) => tag, tags, false, placeholder));
}

module.exports = suggestSubtags;
