import { prisma } from "../../db/database";

export const getTodayBirthdayService = async () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    const birthdays = await prisma.birthdays.findMany({
        where: {
            day: day,
            month: month
        },
        include: {
            user: true
        }
    });

    if (!birthdays) throw new Error("No birthdays found");

    return birthdays
}