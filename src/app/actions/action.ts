"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();
import { auth, currentUser } from "@clerk/nextjs";
import { redirectToSignIn } from "@clerk/nextjs";
import axios from "axios";
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
      Notes: {
        select: {
          arcId: true,
          id: true,
          content: true,
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

export const getArcByProfileId = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return redirectToSignIn();
    }
    const profile = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        arcs: {
          select: {
            id: true,
            todo: true,
            title: true,
            description: true,
            completiontime: true,
            createdAt: true,
            type: true,
            image: true,
            status: true,
            isCompleted: true,
          },
        },
      },
    });
    return profile;
  } catch (error) {
    console.error("Request error", error);
  }
};

export const checkTodo = async (todoId: any) => {
  try {
    const user = await currentUser();

    if (!user) {
      return redirectToSignIn();
    }
    const updatedTodo = await prisma.arcTodos.update({
      where: {
        id: todoId,
      },
      data: {
        isChecked: true,
      },
    });
    return updatedTodo;
  } catch (error) {
    console.error("Request error", error);
  }
};
export const unCheckTodo = async (todoId: any) => {
  try {
    const user = await currentUser();

    if (!user) {
      return redirectToSignIn();
    }
    const updatedTodo = await prisma.arcTodos.update({
      where: {
        id: todoId,
      },
      data: {
        isChecked: false,
      },
    });
    return updatedTodo;
  } catch (error) {
    console.error("Request error", error);
  }
};
type Note = {
  content: object;
};
export const getNotes = async (arcid: any) => {
  try {
    const user = await currentUser();

    if (!user) {
      return redirectToSignIn();
    }
    const Notes = await prisma.notes.findMany({
      where: {
        arcId: arcid,
      },
      select: {
        id: true,
        content: true,
      },
    });
    return Notes;
  } catch (error) {
    console.log(error);
  }
};
export const saveNotes = async (arcid: any, notes: Note) => {
  try {
    const user = await currentUser();
    //if note already there update it fella
    if (!user) {
      return redirectToSignIn();
    }
    const getNote = await prisma.notes.findMany({
      where: {
        arcId: arcid,
      },
      select: {
        id: true,
        content: true,
      },
    });
    if (getNote[0]?.content) {
      const updatedNote = await prisma.notes.updateMany({
        where: {
          arcId: arcid,
        },
        data: {
          content: notes,
        },
      });
      return updatedNote;
    }
    const addNotes = await prisma.notes.create({
      data: {
        arcId: arcid,
        content: notes,
      },
    });
    revalidatePath(`/arc/${arcid}`);
    return addNotes;
  } catch (error) {
    console.log(error);
  }
};

// export const setTime = async (todoId, date) => {
//   try {
//     const user = await currentUser();

//     if (!user) {
//       return redirectToSignIn();
//     }
//     const updatedTodo = await prisma.arcTodos.update({
//       where: {
//         id: todoId,
//       },
//       data: {
//         isReminder: true,
//         Reminder: date,
//       },
//     });
//     return updatedTodo;
//   } catch (error) {
//     console.error("Request error", error);
//   }
// };
