import { deleteBirthdayService } from "../../services/birthday/delete_birthday.service";
import { RequestHandler } from "express";

export const deleteBirthdayController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const birthday = await deleteBirthdayService(Number(id));
    res.status(200).json(birthday);
    
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
};
