import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();
  console.log(body);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are a goal planner assistant , you will get task name,task description ,task type , task creation date , completion date from user and provide todos and actionable task for it to complete goal , if goal completetion date is there you will divide task in days/hours/week and if not you will simply divide it in days. Tasks should be sorted from highest to lowest priority, where higher-priority tasks are those that act as pre-requisites or are more essential for meeting the objective.Do not remove any tasks. Return the ranked tasks as a numbered list in the format:#. First task #. Second task ,The entries must be consecutively numbered, starting with 1. The number of each entry must be followed by a period.Do not include any headers before your ranked list or follow your list with any other output and it should be an array for mapping.",
      },
      {
        role: "user",
        content: body.messages[1].content,
      },
    ],
  });
  console.log(completion.choices[0].message);
  const theResponse = completion.choices[0].message;

  return NextResponse.json(
    { output: theResponse },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
