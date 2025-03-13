import jwt from "jsonwebtoken";
import { prisma } from "../../db/database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const saltRounds = 10;

export const generateResetToken = (email: string, id: string) => {
  const payload = { email, id };
  const options: jwt.SignOptions = { expiresIn: "1h" };
  const secret = process.env.TOKEN as string;

  if (!secret) {
    throw new Error("Token secret not found");
  }

  return jwt.sign(payload, secret, options);
};

export const resetPasswordService = async (
  id: string,
  token: string,
  newPassword: string
): Promise<void> => {
  const secret = process.env.TOKEN as string;

  console.log("Recebendo token:", token); 
  console.log("Esperando o token da env:", process.env.TOKEN);
  


  if (!secret) {
    throw new Error("Token secret not found");
  }

  const payload = jwt.verify(token, secret) as jwt.JwtPayload;
  if (payload.id !== id) {
    throw new Error("Invalid token");
  }

  const user = await prisma.users.findUnique({ where: { id } });

  if (!user) {
    throw new Error("User not found");
  }

  const samePassword = await bcrypt.compare(newPassword, user.password);

  if (samePassword) {
    throw new Error("New password cannot be the same as the old password");
  }

  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  await prisma.users.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });
};
