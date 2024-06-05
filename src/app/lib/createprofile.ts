"use server";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { Resend } from "resend";
const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);
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
      currentStatus: "Offline",
    },
  });
  // const Response = await axios.post("/api/sendmail");
  // const { data, error } = await resend.emails.send({
  //   from: "ayush5april@gmail.com",
  //   to: [newProfile.email],
  //   subject: "Hello World",
  //   html: "<strong>It works!</strong>",
  // });
  // if (error) {
  //   return Response.json({ error }, { status: 500 });
  // }

  // return Response.json({ data });
  // console.log(Response);
  return newProfile;
};
