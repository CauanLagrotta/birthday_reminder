import { Router } from "express"; 
import { user_routes } from "./users.routes";
import { birthday_routes } from "./birthdays.routes";
import { mail_routes } from "./mail_reminder.routes";
import { auth_routes } from "./auth.routes";
import { prove_youre_human_routes } from "./prove_youre_human.routes";

export const main_routes = Router()

main_routes.use("/users", user_routes) // http://localhost:3000/users
main_routes.use("/birthdays", birthday_routes) // http://localhost:3000/birthdays
main_routes.use("/reminder", mail_routes) // http://localhost:3000/reminder
main_routes.use("/auth", auth_routes) // http://localhost:3000/auth/
main_routes.use("/prove-youre-human", prove_youre_human_routes) // http://localhost:3000/prove-youre-human