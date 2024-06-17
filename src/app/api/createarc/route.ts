import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { redirectToSignIn } from "@clerk/nextjs";

export async function POST(req: Request) {
  const prisma = new PrismaClient();
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
    return NextResponse.json(newarc, {
      status: 200,
    });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json(
      { error: "Error creating goals" },
      { status: 500 }
    );
  }
}
