//get
//post
//update
//delete
// POST /api/note
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

  try {
    const newNote = await prisma.notes.create({
      data: {
        content: body.content,
        arcId: body.arcId,
      },
    });

    return NextResponse.json(newNote, { status: 200 });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({ error: "Error creating note" }, { status: 500 });
  }
}
// GET /api/notes

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  try {
    const notes = await prisma.notes.findMany({
      include: {
        arc: true, // Assuming you want to include details of the Arc
      },
    });

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json(
      { error: "Error retrieving notes" },
      { status: 500 }
    );
  }
}

// PATCH /api/note?noteId=xxx&content=newContent
export async function PATCH(req: Request, res: Response) {
  const { noteId, content } = Object.fromEntries(
    req.url
      .split("?")[1]
      .split("&")
      .map((kv) => [kv.split("=")[0], kv.split("=")[1]])
  );

  try {
    const user = await currentUser();

    const updatedNote = await prisma.notes.update({
      where: {
        id: noteId,
      },
      data: {
        content: content,
      },
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({ error: "Error updating note" }, { status: 500 });
  }
}
