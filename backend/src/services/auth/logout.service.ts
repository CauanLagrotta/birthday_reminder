import { Response } from "express";

export const logoutService = (res: Response) =>{
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out" });
}