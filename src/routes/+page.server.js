import { get_button_press_for_ip, remove_all_button_presses } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

export async function load(e) {
	// if (e.request.url.includes('reset')) {
	// 	//TODO REMOVE THIS
	// 	console.log('resetting');
	// 	await remove_all_button_presses();
	// }

	const button_press = await get_button_press_for_ip(e.getClientAddress());
	if (button_press.rows.length > 0 && button_press.rows[0].button_press == 'red') {
		redirect(301, '/red');
	}

	if (button_press.rows.length > 0 && button_press.rows[0].button_press == 'blue') {
		redirect(301, '/blue');
	}

	return {};
}
