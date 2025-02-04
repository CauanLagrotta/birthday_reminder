import { prisma } from "../../db/database";

export const createBirthdayService = async (
  birthday_person: string,
  date: String,
  userId: string
) => {
  const [day, month] = date.split("/").map(Number);

  const birthday = await prisma.birthdays.create({
    data: {
      birthday_person,
      day,
      month,
      user: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      user: true,
    },
  });

  return birthday;
};
