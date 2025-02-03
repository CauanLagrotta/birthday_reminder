import { RequestHandler } from "express";
import { editUserService } from "../../services/user/edit_user.service";

export const editUserController: RequestHandler = async (req, res) =>{
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const user = await editUserService(id, name, email);
        res.status(200).json(user);
        
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unknown error" });
        }
    }
}