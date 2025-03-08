import { seeBirthdayService } from "../../services/birthday/see_birthday.service";
import { RequestHandler } from "express";

export const seeBirthdayController: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const birthdays = await seeBirthdayService(userId);
    res.status(200).json(birthdays);
    
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
};
