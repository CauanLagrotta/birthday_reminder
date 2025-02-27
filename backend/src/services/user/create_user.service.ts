import { prisma } from "../../db/database";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const createUserService = async (
  email: string,
  name: string,
  password: string
) => {
  const existingUser = await prisma.users.findFirst({
    where: {
      OR: [{ email }, { name }],
    },
  });

  if (existingUser) {
    throw new Error("Nome ou e-mail já cadastrados");
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await prisma.users.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return user;
};
