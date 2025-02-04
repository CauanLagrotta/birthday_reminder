import { prisma } from "../../db/database";

export const editBirthdayService = async (
  id: number,
  birthday_person: string,
  date: string

) => {
  const [day, month] = date.split("/").map(Number);

  const birthday = await prisma.birthdays.update({
    where: {
      id,
    },
    data: {
      birthday_person,
      day,
      month,
    },
  });

  return birthday;
};
