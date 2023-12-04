import axios from "axios";
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

    const orientation =["landscape","portrait","squarish"]
      const randomSize = Math.floor(Math.random() * orientation.length)
      const unsplash =await axios.get("https://api.unsplash.com/photos/random",{params:{
        client_id:process.env.UNSPLASH_ACCESS_KEY,
        count:1,
        orientation:orientation[randomSize]
      }})
      const imageUrl =unsplash.data[0].urls.regular;
    

    return NextResponse.json(imageUrl);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
