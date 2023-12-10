import connect from "@/lib/db";
import Post from "@/models/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
