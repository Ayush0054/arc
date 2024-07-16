import { NextResponse } from "next/server";
import OpenAI from "openai";
import axios from "axios";
import cheerio from "cheerio";
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
export async function POST(req: Request, res: NextResponse) {
  //   const body = await req.json();
  //   console.log(body);

  const { url } = await req.json();

  // Scrape the website
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const title = $("title").text();
  const description = $('meta[name="description"]').attr("content") || "";
  const bodyText = $("body").text().trim().slice(0, 1000); // Limit to first 1000 characters

  // Generate README using GPT-4
  const prompt = `Generate a README in markdown format for a website with the following details:
Title: ${title}
Description: ${description}
Content preview: ${bodyText}

The README should include:
1. A brief introduction
2. Key features or sections of the website
3. Any notable technologies or frameworks used (if apparent)
4. A conclusion or call to action`;

  const gptResponse = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "github readme generator .",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const readmeContent = gptResponse.choices[0].message;

  //   res.status(200).json({ readme: readmeContent });

  return NextResponse.json(
    { readme: readmeContent },
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
