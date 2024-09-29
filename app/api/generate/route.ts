import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    // unsplash images api
    // const orientation =["landscape","portrait","squarish"]
    //   const randomSize = Math.floor(Math.random() * orientation.length)
    //   const unsplash =await axios.get("https://api.unsplash.com/photos/random",{params:{
    //     client_id:process.env.UNSPLASH_ACCESS_KEY,
    //     count:1,
    //     orientation:orientation[randomSize]
    //   }})
    //   const imageUrl =unsplash.data[0].urls.regular;

    const body = await req.json();
    const { prompt, model, size } = body.promptData;
    const seed = Math.floor(Math.random() * 1000000);

    const sizeMap: { [key: string]: { width: number, height: number } } = {
      "Square": { width: 1080, height: 1080 },
      "Vertical": { width: 1080, height: 1920 },
      "Landscape": { width: 1920, height: 1080 },
    };

    const selectedSize = sizeMap["Square"];

    const { width, height } = selectedSize;

    const imageUrl = `${process.env.BASE_URL}/${encodeURIComponent(prompt)}?width=${width}&height=${height}&private=true&seed=${seed}&model=${model}&nologo=true`;
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary').toString('base64');
    const mimeType = response.headers['content-type'];
    const base64Image = `data:${mimeType};base64,${buffer}`;


    return NextResponse.json({ status: 200, message: "success",imageUrl: base64Image,width,height });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
