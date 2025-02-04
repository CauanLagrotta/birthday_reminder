import { Router } from "express"; 
import { user_routes } from "./users.routes";
import { birthday_routes } from "./birthdays.routes";

export const main_routes = Router()

main_routes.use("/users", user_routes)
main_routes.use("/birthdays", birthday_routes)