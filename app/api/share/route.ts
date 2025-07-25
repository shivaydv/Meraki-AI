import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import Post from "@/models/models";
import connect from "@/lib/db";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



export async function POST(req: Request, res: Response) {
  try {
    await connect();
    const { name, prompt, image } = await req.json();
    const photoUrl = await cloudinary.uploader.upload(image);
     await Post.create({
      name,
      prompt,
      image: photoUrl.url,
    });
    return NextResponse.json({status:200});
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
