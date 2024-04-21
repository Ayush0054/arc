import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextResponse) {
  const user = await currentUser();
  console.log(user?.id);

  const getToken = await axios.get(
    `https://api.clerk.com/v1/users/${user?.id}/oauth_access_tokens/oauth_google`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    }
  );
  //   console.log(getToken);

  return NextResponse.json({ output: getToken.data }, { status: 200 });
}
