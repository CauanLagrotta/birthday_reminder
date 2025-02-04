import { editBirthdayService } from "../../services/birthday/edit_birthday.service";
import { RequestHandler } from "express";

export const editBirthdayController: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { birthday_person, date } = req.body;

        const birthday = await editBirthdayService(
            Number(id),
            birthday_person,
            date
        );
        res.status(200).json(birthday);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unknown error" });
        }
    }
};