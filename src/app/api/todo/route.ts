// POST /api/todo
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const body = await req.json();
  const { arcId, todos } = body;
  try {
    const newTodo = await prisma.arcTodos.createMany({
      data: todos.map((todo: any) => ({
        todo: todo,
        arcId: arcId,
        isChecked: false, // Default value, can be omitted if default is set in schema
        IsCheckedTime: new Date(),
        isReminder: false,
        Reminder: new Date(),
      })),
    });

    return NextResponse.json(newTodo, { status: 200 });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({ error: "Error creating todo" }, { status: 500 });
  }
}
export async function GET() {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  try {
    const todos = await prisma.arcTodos.findMany({
      include: {
        arc: true, // Assuming you want to include details of the Arc
      },
    });

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json(
      { error: "Error retrieving todos" },
      { status: 500 }
    );
  }
}
