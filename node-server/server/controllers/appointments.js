import { log } from "console";
import { pool } from "../database/index.js";
import { v4 as uuidv4 } from "uuid";

export async function getAppointments(userId) {

    console.log(userId);
    try{
	const { rows } = await pool.query("SELECT * FROM appointments WHERE patient_id = $1 ORDER BY appointment_time DESC", ["70569c2f-8cb2-4272-bd44-67a94433dab7"]);
    console.log("Success")
	return rows
    }
    catch(e){
        console.log("error occured while fetching the data");
    }
}

export async function getAppointment(id) {
	const { rows } = await pool.query("SELECT * FROM appointments WHERE id = $1", [id]);
	return rows[0];
}

export async function createAppointment(data) {
	const id = uuidv4();
	let {
		doctor_name,
		patient_id,
		speciality,
		appointment_time,
		appointment__type,
		app_date,
		app_time,
		duration_minutes,
		status,
		note,
		telemedicine_link
	} = data;

    patient_id = "dbfdf736-cf19-4536-b02c-2ffcac6eb0a7"
    duration_minutes = 30
    console.log(data);
    

    console.log(patient_id,
		speciality,
		doctor_name,
		appointment_time,
		appointment__type,
		app_date,
		app_time,
		duration_minutes,
		status,
		note,
		telemedicine_link);
    
	const { rows } = await pool.query(
		`INSERT INTO appointments (
			id, patient_id, speciality, doctor_name, appointment_time, appointment__type, app_date, app_time, duration_minutes, status, note, telemedicine_link
		) VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
		) RETURNING *`,
		[id, patient_id, speciality, doctor_name, appointment_time, appointment__type, app_date, app_time, duration_minutes, status, note, telemedicine_link]
	);
	return rows[0];
}

export async function updateAppointment(id, data) {
	// Only update provided fields
	const fields = Object.keys(data);
	const values = Object.values(data);
	if (fields.length === 0) return null;
	const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");
	const { rows } = await pool.query(
		`UPDATE appointments SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
		[...values, id]
	);
	return rows[0];
}

export async function deleteAppointment(id) {
	const { rowCount } = await pool.query("DELETE FROM appointments WHERE id = $1", [id]);
	return rowCount > 0;
}
