import express, { Router } from "express";
import { loginController } from "../controllers/auth/login.controller";
import { logoutController } from "../controllers/auth/logout.controller";
import { authMiddleware, verifyUser } from "../middlewares/auth.middleware";
import { forgotPasswordController } from "../controllers/auth/forgot-password.controller";
import { ResetPasswordController } from "../controllers/auth/reset-password.controller";
import { profileController } from "../controllers/auth/profile.controller";

export const auth_routes = Router();

const resetPasswordController = new ResetPasswordController();

auth_routes.post("/login", loginController); // http://localhost:3000/auth/login
auth_routes.get("/logout", logoutController); // http://localhost:3000/auth/logout
auth_routes.get("/header", authMiddleware, verifyUser); // http://localhost:3000/auth/header
auth_routes.post("/forgot-password", forgotPasswordController); // http://localhost:3000/auth/forgot-password

auth_routes.get(
  "/reset-password/:token",
  resetPasswordController.requestResetToken as unknown as express.RequestHandler
); // http://localhost:3000/auth/reset-password/:token
auth_routes.put(
  "/reset-password/:id/:token",
  resetPasswordController.resetPassword as unknown as express.RequestHandler
); // http://localhost:3000/auth/reset-password/:id/:token

auth_routes.get("/profile", authMiddleware, profileController); // http://localhost:3000/auth/profile
