import { Router } from "express"; 
import { user_routes } from "./users.routes";
import { birthday_routes } from "./birthdays.routes";
import { mail_routes } from "./mail.routes";

export const main_routes = Router()

main_routes.use("/users", user_routes)
main_routes.use("/birthdays", birthday_routes)
main_routes.use("/mail", mail_routes)