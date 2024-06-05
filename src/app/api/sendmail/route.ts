import { Resend } from "resend";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  // const body = await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <ayush5april@gmail.com>",
      to: ["ayush0054march@gmail.com"],
      subject: "Hello world",
      react: "",
      text: "Hello world",
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
