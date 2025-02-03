import { RequestHandler } from "express";
import { deleteUserService } from "../../services/user/delete_user.service";

export const deleteUserController: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await deleteUserService(id);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unknown error" });
        }
    }
};