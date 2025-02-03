import { Router } from "express";
import { createUserController } from "../controllers/user/create_user.controller"
import { seeUserController } from "../controllers/user/see_user.controller";
import { editUserController } from "../controllers/user/edit_user.controller";
import { deleteUserController } from "../controllers/user/delete_user.controller";

export const user_routes = Router()

user_routes.post("/", createUserController)
user_routes.get("/", seeUserController)
user_routes.put("/:id", editUserController)
user_routes.delete("/:id", deleteUserController)