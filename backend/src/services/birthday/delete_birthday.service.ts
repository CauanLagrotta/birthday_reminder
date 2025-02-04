import { prisma } from "../../db/database";

export const deleteBirthdayService = async (id: number) => {
  const birthday = await prisma.birthdays.findUnique({
    where: {
      id,
    },
  });

  if (!birthday) throw new Error("Birthday not found");

  const delete_birthday = await prisma.birthdays.delete({
    where: {
      id,
    },
  });

  return delete_birthday;
};
