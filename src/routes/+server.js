import { press_button } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const POST = async (e) => {
	let ip_address = e.getClientAddress();
	let body = await e.request.json();
	if (body.button_press == 'red') {
		await press_button('red', ip_address);
	} else if (body.button_press == 'blue') {
		await press_button('blue', ip_address);
	}
	console.log(JSON.stringify(body.button_press) + ' ' + ip_address);
	return new Response();
};
