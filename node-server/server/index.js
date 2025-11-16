import express from "express";
import { registerRoutes } from "./routes/routes.js";
import { setupVite, serveStatic, log } from "./vite.ts";
import dotenv from "dotenv";
import { pool } from "./database/index.js";
import { ensureUsersTable } from "./schema/usersTable.js";
import { ensureAppsTable } from "./schema/apps.js";
import { ensureWearablesTable } from "./schema/wearables.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  const server = await registerRoutes(app);
  await setupVite(app, server);

  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
  await ensureAppsTable(pool).then(() => console.log("Apps table ensured"));
  await ensureUsersTable(pool).then(() => console.log("Users table ensured"));
  await ensureWearablesTable(pool).then(() => console.log("Wearables table ensured"));
})();
