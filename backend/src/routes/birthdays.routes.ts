import { Router } from "express";
import { createBirthdayController } from "../controllers/birthday/create_birthday.controller";
import { seeBirthdayController } from "../controllers/birthday/see_birthday.controller";
import { editBirthdayController } from "../controllers/birthday/edit_birthday.controller";
import { deleteBirthdayController } from "../controllers/birthday/delete_birthday.controller";

export const birthday_routes = Router();

birthday_routes.post("/", createBirthdayController); // http://localhost:3000/birthdays
birthday_routes.get("/", seeBirthdayController); // http://localhost:3000/birthday
birthday_routes.put("/:id", editBirthdayController); // http://localhost:3000/birthday/:id
birthday_routes.delete("/:id", deleteBirthdayController); // http://localhost:3000/birthday/:id