import { RequestHandler } from "express";
import { forgotPasswordService } from "../../services/auth/forgot-password.service";

export const forgotPasswordController: RequestHandler = async (req, res) => {
    const { email } = req.body;
    
    try {
        await forgotPasswordService(email);
        res.status(200).json({ message: `Email sent to ${email}` });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};