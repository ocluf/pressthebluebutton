import { get_button_press_for_ip } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const load = async (e) => {
	const button_press = await get_button_press_for_ip(e.getClientAddress());
	if (button_press.rows.length === 0) {
		redirect(301, '/');
	}
};
