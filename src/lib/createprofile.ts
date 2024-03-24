"use server";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }
  console.log(profile);

  const newProfile = await prisma.profile.create({
    data: {
      userId: user.id as string,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      pfp: user.imageUrl,
      public: true,
      currentStatus: "Offline",
    },
  });

  return newProfile;
};
