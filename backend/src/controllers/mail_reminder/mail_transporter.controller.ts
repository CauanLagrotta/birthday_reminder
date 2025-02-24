import { RequestHandler } from "express";
import { mailReminderTransporterService } from "../../services/mail_reminder/mail_reminder_transporter.service";

export const mailReminderTransporterController: RequestHandler = async (req, res) => {
    try {
        const mail = await mailReminderTransporterService();
        res.status(200).json(mail);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unknown error" });
        }
    }
};