"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();
import { auth, currentUser } from "@clerk/nextjs";
import { redirectToSignIn } from "@clerk/nextjs";
import axios from "axios";

export const deleteArcById = async (id: any) => {
  const goals = await prisma.arc.deleteMany({
    where: {
      id: id,
    },
  });
  console.log(goals);

  revalidatePath(`/arc/${id}`);
  return goals;
};

export const ArcCheckIsDone = async (id: any, isCompletedBool: any) => {
  const goals = await prisma.arc.updateMany({
    where: {
      id: id,
    },
    data: {
      isCompleted: isCompletedBool,
    },
  });
  console.log(goals);

  revalidatePath(`/arc/${id}`);
  return goals;
};
