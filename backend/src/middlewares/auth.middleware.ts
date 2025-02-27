import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { prisma } from "../db/database";
import { DecodedToken, User } from "../../types/types";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token){
    res.status(401).json({ message: "Unauthorized! Token not found" });
    return
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.TOKEN as string
    ) as DecodedToken;

    const user = await prisma.users.findUnique({
        where: { id: decoded.id },
        select: {
            id: true,
            name: true,
            email: true,
        }
    });

    if(!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    
    req.user = user as User;
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized! Invalid token" });
  }
};

export const verifyUser = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: "User Authenticated", user: req.user });
}
