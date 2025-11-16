import { pool } from "../database/index.js";

export async function getUser(id) {
	const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
	return rows[0];
}

export async function updateUser(id, data) {
	const fields = Object.keys(data);
	const values = Object.values(data);
	if (fields.length === 0) return null;
	const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");
	const { rows } = await pool.query(
		`UPDATE users SET ${setClause}, updated_at = now() WHERE id = $${fields.length + 1} RETURNING *`,
		[...values, id]
	);
	return rows[0];
}
