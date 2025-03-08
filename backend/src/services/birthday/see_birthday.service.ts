import { prisma } from "../../db/database";

export const seeBirthdayService = async (userId: string) => {
    const birthdays = await prisma.birthdays.findMany({
        where: {
            userId
        },
        include: {
            user: true,
        },
    });

    if (birthdays.length === 0) throw new Error("No birthdays found");

    return birthdays;
};
