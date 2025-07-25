import { NextResponse } from "next/server";

export const maxDuration = 100; // 100 seconds

const sizeMap: Record<string, { width: number; height: number }> = {
  Square: { width: 1080, height: 1080 },
  Vertical: { width: 1080, height: 1920 },
  Landscape: { width: 1920, height: 1080 },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, model, size } = body.promptData;

    const seed = Math.floor(Math.random() * 1_000_000);
    const selectedSize = sizeMap[size];

    if (!selectedSize) {
      return NextResponse.json(
        { error: "Invalid size format" },
        { status: 400 }
      );
    }

    const { width, height } = selectedSize;

    const imageUrl = `${process.env.BASE_URL}/${encodeURIComponent(
      prompt
    )}?width=${width}&height=${height}&private=true&seed=${seed}&model=${model}&nologo=true`;
    const imageRes = await fetch(imageUrl);

    if (!imageRes.ok || !imageRes.body) {
      const errorText = await imageRes.text();
      console.error("Image fetch failed:", errorText);
      return new Response("Failed to fetch image", { status: 500 });
    }

    const contentType = imageRes.headers.get("content-type") || "image/jpeg";
    const contentDisposition =
      imageRes.headers.get("content-disposition") || "inline";

      
    return new Response(imageRes.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentDisposition,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Something went wrong on the server." },
      { status: 500 }
    );
  }
}
