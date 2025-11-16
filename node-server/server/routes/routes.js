
import { getUser, updateUser } from "../controllers/user.js";
import { getAppointments, getAppointment, createAppointment, updateAppointment, deleteAppointment } from "../controllers/appointments.js";
import { getWearableData, getLatestWearableData, createWearableData } from "../controllers/wearablesData.js";
import { errorHandler } from "../middlewares/common.js";

export async function registerRoutes(app) {
  const DEFAULT_USER_ID = "user-1";

  // User profile endpoints
  app.get("/api/user/profile", async (_req, res, next) => {
    try {
      const user = await getUser(DEFAULT_USER_ID);
      if (!user) return res.status(404).json({ error: "User not found" });
      const { password_hash, salt, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (err) { next(err); }
  });

  app.patch("/api/user/profile", async (req, res, next) => {
    try {
      const updated = await updateUser(DEFAULT_USER_ID, req.body);
      if (!updated) return res.status(404).json({ error: "User not found" });
      const { password_hash, salt, ...userWithoutPassword } = updated;
      res.json(userWithoutPassword);
    } catch (err) { next(err); }
  });

  // Appointments endpoints
  app.get("/api/appointments", async (_req, res, next) => {
    try {
      const appointments = await getAppointments(DEFAULT_USER_ID);
      res.json(appointments);
    } catch (err) { next(err); }
  });

  app.get("/api/appointments/:id", async (req, res, next) => {
    try {
      const appointment = await getAppointment(req.params.id);
      if (!appointment) return res.status(404).json({ error: "Appointment not found" });
      res.json(appointment);
    } catch (err) { next(err); }
  });

  app.post("/api/appointments", async (req, res, next) => {
    try {
      
        // console.log(req.body, "heyy");
        
        const appointment = await createAppointment({ ...req.body, patient_id: DEFAULT_USER_ID });
      res.status(201).json(appointment);

    } catch (err) { next(err); }
  });

  app.patch("/api/appointments/:id", async (req, res, next) => {
    try {
      const updated = await updateAppointment(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: "Appointment not found" });
      res.json(updated);
    } catch (err) { next(err); }
  });

  app.delete("/api/appointments/:id", async (req, res, next) => {
    try {
      const deleted = await deleteAppointment(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Appointment not found" });
      res.status(204).send();
    } catch (err) { next(err); }
  });

  // Wearables endpoints
  app.get("/api/wearables", async (_req, res, next) => {
    try {
      const data = await getWearableData(DEFAULT_USER_ID);
      res.json(data);
    } catch (err) { next(err); }
  });

  app.get("/api/wearables/latest", async (_req, res, next) => {
    try {
      const data = await getLatestWearableData(DEFAULT_USER_ID);
      if (!data) return res.status(404).json({ error: "No wearable data found" });
      res.json(data);
    } catch (err) { next(err); }
  });

  app.post("/api/wearables", async (req, res, next) => {
    try {
      const data = await createWearableData({ ...req.body, user_id: DEFAULT_USER_ID });
      res.status(201).json(data);
    } catch (err) { next(err); }
  });

  // Attach error handler
  app.use(errorHandler);

  return app;
}
