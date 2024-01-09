import { getButtonPressesByCountry } from '$lib/server/db';
import { aggregatePressCounts } from '$lib/util.js';

export const load = async (e) => {
	// get stats
	let presses = await getButtonPressesByCountry();
	const aggregation = aggregatePressCounts(presses);

	return { presses_by_country: aggregation };
};
