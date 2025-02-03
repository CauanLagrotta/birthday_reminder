import { prisma } from "../../db/database";

export const deleteUserService = async (id: string) => {
    const user = await prisma.users.findUnique({
        where: {
            id
        }
    })

    if(!user) throw new Error("User not found");

    const delete_user = await prisma.users.delete({
        where: {
            id
        }
    })

    return delete_user
}