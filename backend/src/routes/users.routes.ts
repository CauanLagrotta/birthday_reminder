import { Router } from "express";
import { createUser } from "../controllers/user/create_user.controller"
import { User } from "../../types/types"

export const user_routes = Router()


user_routes.post("/", createUser)