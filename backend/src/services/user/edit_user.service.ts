import { prisma } from "../../db/database";

export const editUserService = async (
  id: string,
  name: string,
  email: string,
) => {
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  })

  if(!user) throw new Error("User not found");

  const update_user = await prisma.users.update({
    where: {
      id,
    },
    data: {
      name,
      email,
    },
  });

  return update_user
};
