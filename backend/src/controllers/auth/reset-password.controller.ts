import { generateResetToken, resetPasswordService } from "../../services/auth/reset-password.service";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

export class ResetPasswordController{
    async requestResetToken(req: express.Request, res: express.Response): Promise<express.Response> {
        const { email, id } = req.body;
        
        try{
            const token = generateResetToken(email, id);
            const resetLink = `${process.env.FRONTEND_URL}/${id}/${token}`;

            return res.status(200).json({ resetLink });

        }catch(error){
            return res.status(500).json({ error: error});
        }
    }

    async resetPassword(req: express.Request, res: express.Response): Promise<express.Response> {
        const { id, token } = req.params;
        const { password } = req.body;
        
        try{
            await resetPasswordService(id, token, password);
            return res.status(200).json({ message: "Password reset successfully" });
        }catch(error){
            console.log(error);
            return res.status(500).json({ error: error });
        }
    }
}