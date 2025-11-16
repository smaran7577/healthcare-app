
const createAppsTable = `

  CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY,
    patient_id UUID NOT NULL,
    speciality text not null,
    doctor_name varchar(256) NOT NULL   ,
    appointment_time TIMESTAMPTZ,
    appointment__type text,
    app_date DATE,
    app_time TIME,
    duration_minutes INT NOT NULL DEFAULT 30,
    status TEXT NOT NULL DEFAULT 'pending',
    note TEXT,
    telemedicine_link TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

`

export async function ensureAppsTable(pool) {
    await pool.query(createAppsTable);    
}