import { pool } from "../database/index.js";
import { v4 as uuidv4 } from "uuid";

export async function getWearableData(userId) {
    userId = "70569c2f-8cb2-4272-bd44-67a94433dab7";
	const { rows } = await pool.query("SELECT * FROM wearables WHERE user_id = $1 ORDER BY timestamp DESC", [userId]);
	return rows;
}

export async function getLatestWearableData(userId) {
    userId = "70569c2f-8cb2-4272-bd44-67a94433dab7";
	const { rows } = await pool.query("SELECT * FROM wearables WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 1", [userId]);
	return rows[0];
}

export async function createWearableData(data) {
	const id = uuidv4();
	const { user_id, type, value, timestamp } = data;
	const { rows } = await pool.query(
		`INSERT INTO wearables (id, user_id, type, value, timestamp) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
		[id, user_id, type, value, timestamp]
	);
	return rows[0];
}
