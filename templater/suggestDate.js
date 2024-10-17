
async function suggestDate(tp) {

	var output_fmt = 'YYYY-MM-DD';

	const suggestions = new Map();
	suggestions.set(
		"Today, "+moment().format('ddd MMM, D'),
		moment()
	);
	suggestions.set(
		"Tomorrow, "+moment().add(1,'days').format('ddd MMM, D'),
		moment().add(1,'days')
	);
	suggestions.set(
		moment().add(2,'days').format('ddd MMM, D'),
		moment().add(2,'days')
	);
	suggestions.set(
		moment().add(3,'days').format('ddd MMM, D'),
		moment().add(3,'days')
	);
	suggestions.set(
		moment().add(4,'days').format('ddd MMM, D'),
		moment().add(4,'days')
	);
	suggestions.set(
		moment().add(5,'days').format('ddd MMM, D'),
		moment().add(5,'days')
	);
	suggestions.set(
		"Manual",
		null
	);

	const selection = await tp.system.suggester(
			[...suggestions].map(([k, v]) => k !== "Manual" ? k + " (" + v.format("YYYY-MM-DD") + ")" : k),
			Array.from(suggestions.values())
	);

	var date = null;
	if (!selection) {
			inputDate = await tp.system.prompt("Type a date (YYYY-MM-DD):");
			date = moment(inputDate, "YYYY-MM-DD");
			if (!date.isValid()) {
				date = moment();
			}
	} else {
			date = selection;
	}

	return date.format(output_fmt);
}

module.exports = suggestDate;

