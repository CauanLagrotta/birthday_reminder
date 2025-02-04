import { Router } from "express";
import { createBirthdayController } from "../controllers/birthday/create_birthday.controller";

export const birthday_routes = Router();

birthday_routes.post("/", createBirthdayController);