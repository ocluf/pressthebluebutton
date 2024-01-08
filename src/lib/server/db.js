import { dev } from '$app/environment';
import { TURSO_DB_TOKEN } from '$env/static/private';
import { createClient } from '@libsql/client';

const client = createClient({
	url: dev ? 'http://127.0.0.1:8080' : 'libsql://enough-psycho-man-ocluf.turso.io',
	authToken: TURSO_DB_TOKEN
});
export const press_button = async (button_press, ip_address) => {
	await client.execute({
		sql: `
            INSERT INTO button_presses (button_press, ip_address)
            SELECT :button_press, :ip_address
            WHERE NOT EXISTS (
                SELECT 1 FROM button_presses WHERE ip_address = :ip_address
            )
        `,
		args: { button_press, ip_address }
	});
};

export const get_button_press_for_ip = async (ip_address) => {
	if (!ip_address) {
		throw new Error('IP address is undefined or invalid');
	}
	return client.execute({
		sql: `SELECT * FROM button_presses WHERE ip_address = ?`,
		args: [ip_address]
	});
};

export const remove_all_button_presses = async () => {
	await client.execute({
		sql: `DELETE FROM button_presses`,
		args: []
	});
};

// CREATE TABLE button_presses (
//     button_id SERIAL PRIMARY KEY,
//     button_press VARCHAR(255),
//     ip_address VARCHAR(255)
// );
