//get
//post
//update
//delete

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { redirectToSignIn } from "@clerk/nextjs";
const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
  try {
    const user = await currentUser();
    const body = await req.json();
    if (!user) {
      return redirectToSignIn();
    }
    const profile = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    });
    console.log(profile);
    const newarc = await prisma.arc.create({
      data: {
        profile: { connect: { userId: user.id } },
        title: body.title,
        description: body.description,
        type: body.type,
        image: body.image,
        completiontime: body.completiontime,
        status: body.status,
        isCompleted: false,
      },
    });
    return NextResponse.json(newarc, { status: 200 });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json(
      { error: "Error retrieving goals" },
      { status: 500 }
    );
  }
}
export async function GET(request: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return redirectToSignIn();
    }
    const goals = await prisma.arc.findMany({
      where: {
        id: "a1a4e5d8-0b13-4ffd-b221-40b7c67501d3",
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
        Notes: {
          select: {
            arcId: true,
          },
        },
      },
    });
    return NextResponse.json(goals, { status: 200 });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json(
      { error: "Error retrieving goals" },
      { status: 500 }
    );
  }
}
