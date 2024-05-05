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
          // id: true,
        },
      },
      todo: {
        select: {
          id: true,
          arcId: true,
          todo: true,
          isChecked: true,
          IsCheckedTime: true,
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

export const deleteTodoByID = async (id: any, arcId: any) => {
  console.log(id);

  const todo = await prisma.arcTodos.delete({
    where: {
      id: id,
      arcId: arcId,
    },
  });
  console.log(todo);
  revalidatePath(`/arc/${id}`);
  // return todo;
};

export const AddSingleTodo = async (arcId: any, todo: any) => {
  const todos = await prisma.arcTodos.create({
    data: {
      arcId: arcId,
      todo: todo,
      isChecked: false,
      isReminder: false,
      IsCheckedTime: new Date(),
    },
  });
  revalidatePath(`/arc/${arcId}`);
  return todos;
};
