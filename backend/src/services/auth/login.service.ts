import { prisma } from "../../db/database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const loginService = async (email: string, password: string) => {
  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) throw new Error("Usuário não encontrado");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Senha incorreta");

  const token = jwt.sign({ id: user.id }, process.env.TOKEN as string, {
    expiresIn: "1d",
  });

  return { token, user };
};