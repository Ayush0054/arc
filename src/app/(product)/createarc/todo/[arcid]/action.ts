"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();
export const getArcById = async (id: any) => {
  const goals = await prisma.arc.findUnique({
    where: {
      id: id,
    },
    include: {
      profile: {
        select: {
          name: true,
        },
      },
      todo: {
        select: {
          arcId: true,
        },
      },
      ArcProgress: {
        select: {
          arcId: true,
        },
      },
      Notes: {
        select: {
          arcId: true,
        },
      },
    },
  });
  console.log(goals);

  revalidatePath(`/createarc/todo/${id}`);
  return goals;
};
