import { createBirthdayService } from "../../services/birthday/create_birthday.service";
import { RequestHandler } from "express";

export const createBirthdayController: RequestHandler = async (req, res) => {
    try {
        const { birthday_person, date, userId } = req.body;

        const birthday = await createBirthdayService(
            birthday_person,
            date,
            userId
        );

        res.status(201).json(birthday);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unknown error" });
        }
    }
};