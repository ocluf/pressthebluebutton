// @ts-ignore
export function aggregatePressCounts(resultSet) {
	const counts = {};

	resultSet.rows.forEach((row) => {
		const { country, button_press, press_count } = row;

		// Initialize the country object if not already present
		if (!counts[country]) {
			counts[country] = { country, blue: 0, red: 0 };
		}

		// Increment the corresponding count
		if (button_press === 'blue') {
			counts[country].blue += press_count;
		} else if (button_press === 'red') {
			counts[country].red += press_count;
		}
	});

	return Object.values(counts);
}
