import { RequestHandler } from "express";
import { seeUserService } from "../../services/user/see_user.service";

export const seeUserController: RequestHandler = async (req, res) => {
  try {
    const users = await seeUserService();
    res.status(200).json(users);

  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
};
