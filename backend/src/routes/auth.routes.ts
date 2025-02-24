import { Router } from "express";
import { loginController } from "../controllers/auth/login.controller";
import { logoutController } from "../controllers/auth/logout.controller";
import { authMiddleware, verifyUser } from "../middlewares/auth.middleware";
import { forgotPasswordController } from "../controllers/auth/forgot-password.controller";

export const auth_routes = Router();

auth_routes.post("/login", loginController); // http://localhost:3000/auth/login
auth_routes.get("/logout", logoutController); // http://localhost:3000/auth/logout
auth_routes.get("/header", authMiddleware , verifyUser) // http://localhost:3000/auth/header
auth_routes.post("/forgot-password", forgotPasswordController) // http://localhost:3000/auth/forgot-password
