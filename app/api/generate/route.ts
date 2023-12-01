import connect from "@/lib/db";
import Post from "@/models/models";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: Response) {
  try {
    // const {name,prompt} = await req.json()
    await connect();
    // const test = await Post.create({name:"shiva",prompt:"images prompt",image:"random"})
    // const response = await openai.images.generate({
    //   model: "dall-e-3",
    //   prompt: "a white siamese cat",
    //   n: 1,
    //   size: "1024x1024",
    //   response_format: "url",
    // });

    // console.log(response.data)
    return NextResponse.json("response");
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
