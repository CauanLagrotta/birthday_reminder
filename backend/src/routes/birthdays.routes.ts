import { Router } from "express";
import { createBirthdayController } from "../controllers/birthday/create_birthday.controller";
import { seeBirthdayController } from "../controllers/birthday/see_birthday.controller";
import { editBirthdayController } from "../controllers/birthday/edit_birthday.controller";
import { deleteBirthdayController } from "../controllers/birthday/delete_birthday.controller";

export const birthday_routes = Router();

birthday_routes.post("/", createBirthdayController);
birthday_routes.get("/", seeBirthdayController);
birthday_routes.put("/:id", editBirthdayController);
birthday_routes.delete("/:id", deleteBirthdayController);