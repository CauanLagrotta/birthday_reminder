import { prisma } from "../../db/database";

export const seeBirthdayService = async () => {
    const birthdays = await prisma.birthdays.findMany({
        include: {
            user: true,
        },
    });

    if (!birthdays) throw new Error("No birthdays found");

    return birthdays;
};