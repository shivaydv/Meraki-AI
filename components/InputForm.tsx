"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { toast } from "./ui/use-toast";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";

import { getRandomPrompt } from "@/lib/utils";
import Loader from "./Loader";

import FileSaver from "file-saver";
import { Label } from "./ui/label";

const formSchema = z.object({
  prompt: z
    .string()
    .min(4, { message: "Prompt must be at least 4 characters" }),
});

export function InputFrom() {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [Loading, setLoading] = useState<boolean>(false);
  const [Sharing, setSharing] = useState<boolean>(false);
  const [Uploaded, setUploaded] = useState<boolean>(false);
  const [promptData, setpromptData] = useState({
    prompt: "",
    model: "flux",
    size: "Square",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setpromptData({ ...promptData, [name]: value });
  };

  async function uploadImage() {
    try {
      setSharing(true);
      const { prompt } = promptData;
      const res = await axios.post(`/api/share`, {
        prompt,
        image: imageUrl,
      });
      if (res.data.status == 200) {
        toast({
          title: "Message",
          description: "Shared Successfully!",
          className: "bg-green-600 text-white",
        });
        setUploaded(true);
      } else {
        toast({
          title: "Error",
          description: "Can't Share in Community",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went Wrong",
        variant: "destructive",
      });
    } finally {
      setSharing(false);
    }
  }

  const downloadImage = (image: string) => {
    if (imageUrl) {
      const { prompt } = promptData;
      FileSaver.saveAs(image, prompt);
      toast({
        title: "Message",
        description: "Downloading Started",
        className: "bg-green-600 text-white",
      });
    } else {
      toast({
        title: "Error",
        description: "Download Failed",
        variant: "destructive",
      });
    }
  };

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      setLoading(true);
      setImageUrl(undefined);
      setUploaded(false);
      const res = await axios.post(`/api/generate`, {
        promptData,
      });
      setImageUrl(res.data.imageUrl);
      // setpromptData({ ...promptData, prompt: "" });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went Wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const surpriseMe = () => {
    const promptString = getRandomPrompt();
    setpromptData({ ...promptData, prompt: promptString });
  };

  return (
    <div>
      <div className="flex justify-between sm:items-center md:px-10 gap-10 flex-col lg:flex-row   max-h-screen">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-md w-full flex flex-col justify-center gap-4"
        >
          <div className="space-y-2 w-full">
            <div className="flex gap-4 flex-wrap w-full ">
              <div className="space-y-2">
                <Label  htmlFor="name">Model</Label>

                <Select
                  required
                  value={promptData.model}
                  name="model"
                  onValueChange={(e) =>
                    setpromptData({ ...promptData, model: e })
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Model</SelectLabel>
                      <SelectItem value="flux">Normal</SelectItem>
                      <SelectItem value="flux-3d">3D</SelectItem>
                      <SelectItem value="flux-anime">Anime</SelectItem>
                      <SelectItem value="flux-realism">Realistic</SelectItem>
                      <SelectItem value="any-dark">Dark</SelectItem>
                      <SelectItem value="turbo">Turbo</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label  htmlFor="name">Size</Label>

                <Select
                  required
                  value={promptData.size}
                  name="model"
                  disabled
                  onValueChange={(e) =>
                    setpromptData({ ...promptData, size: e })
                  }
                >
                  <SelectTrigger className="w-[180px] ">
                    <SelectValue placeholder="Select Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Model</SelectLabel>

                      <SelectItem value="Square">Square 1:1</SelectItem>
                      <SelectItem value="Vertical">Vertical 9:16</SelectItem>
                      <SelectItem value="Landscape">Landscape 16: 9</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Prompt</Label>

              <Input
                id="prompt"
                placeholder="Enter Your Prompt here..."
                name="prompt"
                value={promptData.prompt}
                onChange={handleChange}
                required
                className="resize-none w-full"
                autoComplete="off"
              />
            </div>
          </div>

<div className="flex flex-col gap-2">

          <Button type="submit" className="w-" disabled={Loading}>
            {Loading ? <> <Loader /><p className="pl-2"> Generating</p> </>   : "Generate"}
          </Button>
{
  imageUrl && (
    <div className="flex gap-2 ">
    <Button
      onClick={() => downloadImage(imageUrl)}
      className="w-full"
      type="button"
    >
      Download
    </Button>
    <Button
      onClick={uploadImage}
      className="w-full"
      type="button"
      disabled={Sharing || Uploaded}
    >
      {Sharing ? <> <Loader /><p className="pl-2"> Sharing</p> </>   : "Share in Community"}
    </Button>
  </div>
  )
}
</div>
        </form>

        <div className="w-full max-sm:max-w-md sm:w-[450px] md:w-[450px]  flex justify-center">
          <AspectRatio ratio={1 / 1}>
            {imageUrl ? (
              <Image
                src={`${imageUrl}`}
                loading="lazy"
                fill
                className={`rounded-lg object-cover  shadow-lg w-full h-full`}
                alt="AI Generated Image"
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center bg-primary-foreground border-2 rounded-lg flex-col gap-2 ">
                {Loading ? (
                  <Skeleton className="w-full bg-primary/10 h-full border-2" ><Loader/></Skeleton>
                ) : (

                    <p className="text-gray-500">No Image Generated Yet</p>

                )}
              </div>
            )}
          </AspectRatio>
        </div>
      </div>
    </div>
  );
}
export default InputFrom;
