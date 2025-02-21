import { RequestHandler } from "express";
import { getTodayBirthdayService } from "../../services/mail_reminder/today_birthday.service";

export const getTodayBirthdayController: RequestHandler = async (req, res) => {
    try {
        const birthdays = await getTodayBirthdayService();
        res.status(200).json(birthdays);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unknown error" });
        }
    }
};