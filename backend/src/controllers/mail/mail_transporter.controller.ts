import { RequestHandler } from "express";
import { mailTransporterService } from "../../services/mail/mail_transporter.service";

export const mailTransporterController: RequestHandler = async (req, res) => {
    try {
        const mail = await mailTransporterService();
        res.status(200).json(mail);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unknown error" });
        }
    }
};