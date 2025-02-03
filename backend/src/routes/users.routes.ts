import { Router } from "express";
import { createUserController } from "../controllers/user/create_user.controller"
import { seeUserController } from "../controllers/user/see_user.controller";

export const user_routes = Router()


user_routes.post("/", createUserController)
user_routes.get("/", seeUserController)