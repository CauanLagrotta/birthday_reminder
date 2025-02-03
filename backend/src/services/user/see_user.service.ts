import { prisma } from "../../db/database";

export const seeUserService = async () => {
  const users = await prisma.users.findMany();

  if (!users) throw new Error("No users found");

  return users;
};
