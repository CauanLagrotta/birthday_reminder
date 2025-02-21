import { logoutService } from "../../services/auth/logout.service";
import { RequestHandler } from "express";

export const logoutController: RequestHandler = async (_, res) => {
  try {
    logoutService(res);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};