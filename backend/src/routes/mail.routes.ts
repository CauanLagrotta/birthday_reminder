import { Router } from "express";
import { getTodayBirthdayController } from "../controllers/mail/today_birthday.controller";
import { mailTransporterController } from "../controllers/mail/mail_transporter.controller";

export const mail_routes = Router();

mail_routes.get("/", getTodayBirthdayController);
mail_routes.post("/", mailTransporterController);