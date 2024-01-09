import { press_button } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const POST = async (e) => {
	let ip_address = e.getClientAddress();
	let body = await e.request.json();
	if (body.button_press !== 'red' && body.button_press !== 'blue') {
		return new Response('Invalid button press', { status: 400 });
	}

	let country = 'unknown';
	try {
		let result = await fetch('https://api.country.is/' + ip_address, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		let json = await result.json();
		if (json.country) {
			country = json.country;
		}
	} catch (e) {
		console.log(e);
	}

	await press_button(body.button_press, ip_address, country, Date.now());

	console.log(JSON.stringify(body.button_press) + ' ' + ip_address);
	return new Response();
};
