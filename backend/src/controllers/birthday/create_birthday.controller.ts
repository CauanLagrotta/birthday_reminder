import { createBirthdayService } from "../../services/birthday/create_birthday.service";
import { RequestHandler } from "express";

export const createBirthdayController: RequestHandler = async (req, res) => {
    try {
        const { birthday_person, date } = req.body;

        const birthday = await createBirthdayService(
            birthday_person,
            date,
            req.user?.id as string
        );

        res.status(201).json(birthday);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao criar aniversario', error);
            res.status(500).json({ message: error.message });
        } else {
            console.error('Erro desconhecido ao criar aniversario', error);
            res.status(500).json({ message: "Unknown error" });
        }
    }
};