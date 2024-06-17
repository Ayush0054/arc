"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { render } from "@react-email/render";
const prisma = new PrismaClient();
import { currentUser } from "@clerk/nextjs";
import { redirectToSignIn } from "@clerk/nextjs";
import { Resend } from "resend";

export const getArcById = async (id: string) => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }
  const arc = await prisma.arc.findUnique({
    where: {
      id: id,
      profileId: user.id,
    },
    include: {
      profile: {
        select: {
          name: true,
        },
      },
      todo: {
        select: {
          id: true,
          todo: true,
          isChecked: true,
          dateTime: true,
        },
        orderBy: {
          dateTime: "asc",
        },
        take: 100, // limit results for pagination
      },
      Notes: {
        select: {
          id: true,
          content: true,
        },
        take: 100, // limit results for pagination
      },
    },
  });

  revalidatePath(`/createarc/todo/${id}`);
  return arc;
};

export const deleteTodoByID = async (id: any, arcId: any) => {
  const todo = await prisma.arcTodos.delete({
    where: {
      id: id,
      arcId: arcId,
    },
  });

  revalidatePath(`/arc/${id}`);
  return todo;
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
            title: true,
            description: true,
            completiontime: true,
            createdAt: true,
            type: true,
            image: true,
            status: true,
            isCompleted: true,
            todo: {
              select: {
                id: true,
                todo: true,
                isChecked: true,
                dateTime: true,
              },
              orderBy: {
                dateTime: "asc",
              },
              take: 100, // limit results for pagination
            },
          },
        },
      },
    });

    return profile;
  } catch (error) {
    console.error("Request error", error);
    throw new Error("Failed to fetch profile with arcs"); // Throw an error to ensure the caller is aware
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

//login

// export const send = async (email: any) => {
//   console.log(email);

//   const resend = new Resend(process.env.RESEND_API_KEY);

//   const { data, error } = await resend.emails.send({
//     from: "ayush5april@gmail.com ",
//     to: [email],
//     subject: "Hello World",

//     react: WelcomeEmailTemplate({ firstName: "John" }),
//   });
//   if (error) {
//     return Response.json({ error }, { status: 500 });
//   }
//   console.log(data);
// };

// export const checkLogin = async () => {
//   const user = await currentUser();
//   //if note already there update it fella
//   if (!user) {
//     return redirectToSignIn();
//   }
// };
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
