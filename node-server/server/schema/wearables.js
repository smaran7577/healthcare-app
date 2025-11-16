const createWearablesTable = `
  CREATE TABLE IF NOT EXISTS wearables (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    value TEXT,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
  );
`;

export async function ensureWearablesTable(pool) {
  await pool.query(createWearablesTable);
}
