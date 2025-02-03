import { Router } from "express"; 
import { user_routes } from "./users.routes";

export const main_routes = Router()

main_routes.use("/users", user_routes)