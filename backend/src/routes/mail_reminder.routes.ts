import { Router } from "express";
import { getTodayBirthdayController } from "../controllers/mail_reminder/today_birthday.controller";
import { mailReminderTransporterController } from "../controllers/mail_reminder/mail_transporter.controller";

export const mail_routes = Router();

mail_routes.get("/", getTodayBirthdayController); // http://localhost:3000/reminder
mail_routes.post("/", mailReminderTransporterController); // http://localhost:3000/reminder