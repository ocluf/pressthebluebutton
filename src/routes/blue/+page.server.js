import { getButtonPressesByCountry, get_button_press_for_ip } from '$lib/server/db';
import { aggregatePressCounts } from '$lib/util.js';
import { redirect } from '@sveltejs/kit';

export const load = async (e) => {
	const button_press = await get_button_press_for_ip(e.getClientAddress());
	if (button_press.rows.length === 0) {
		redirect(301, '/');
	}
	if (button_press.rows.length > 0 && button_press.rows[0].button_press == 'red') {
		redirect(301, '/red');
	}
	// get stats
	let presses = await getButtonPressesByCountry();
	const aggregation = aggregatePressCounts(presses);

	return { presses_by_country: aggregation };
};
