import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export async function POST(req: Request, res: Response) {
  try {
    // const {name,prompt} = await req.json()
    // const response = await openai.images.generate({
    //   model: "dall-e-3",
    //   prompt: "a white siamese cat",
    //   n: 1,
    //   size: "1024x1024",
    //   response_format: "url",
    // });

    // console.log(response.data)
    

    return NextResponse.json("https://images.unsplash.com/photo-1701220291853-99945bcc23d5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
