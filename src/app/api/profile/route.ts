import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { redirectToSignIn } from "@clerk/nextjs";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return redirectToSignIn();
    }
    const goals = await prisma.arc.findMany({
      where: {
        profileId: user.id,
      },
      include: {
        profile: {
          select: {
            name: true,
            // userName: true,
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
