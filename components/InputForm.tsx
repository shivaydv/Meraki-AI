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

export function InputForm() {
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

  // Add this function to determine the aspect ratio
  const getAspectRatio = (size: string) => {
    switch (size) {
      case "Vertical":
        return 9 / 16;
      case "Landscape":
        return 16 / 9;
      default:
        return 1;
    }
  };


  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 ">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full md:w-1/2 "
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Select
                  required
                  value={promptData.model}
                  name="model"
                  onValueChange={(e) =>
                    setpromptData({ ...promptData, model: e })
                  }
                >
                  <SelectTrigger className="w-full">
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
                <Label htmlFor="size">Size</Label>
                <Select
                  required
                  value={promptData.size}
                  name="size"
                  onValueChange={(e) =>
                    setpromptData({ ...promptData, size: e })
                  }
                >
                  <SelectTrigger className="w-full">
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
              <Label htmlFor="prompt">Prompt</Label>
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

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button type="submit" className="w-full" disabled={Loading}>
                {Loading ? (
                  <>
                    <Loader />
                    <p className="pl-2">Generating</p>
                  </>
                ) : (
                  "Generate"
                )}
              </Button>
              <Button
                onClick={surpriseMe}
                type="button"
                variant="outline"
                className="w-full"
              >
                Surprise Me
              </Button>
            </div>
            {imageUrl && (
              <div className="grid grid-cols-2 gap-4">
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
                  {Sharing ? (
                    <>
                      <Loader />
                      <p className="pl-2">Sharing</p>
                    </>
                  ) : (
                    "Share in Community"
                  )}
                </Button>
              </div>
            )}
          </div>
        </form>


        <div className={`w-full mx-auto md:w-1/2  ${promptData.size == "Vertical"? "max-w-sm":"max-w-md" }`}>
          <AspectRatio ratio={getAspectRatio(promptData.size)}>
            {imageUrl ? (
              <Image
                src={`${imageUrl}`}
                loading="lazy"
                fill
                className="rounded-lg object-cover shadow-lg"
                alt="AI Generated Image"
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center bg-primary-foreground border-2 rounded-lg flex-col gap-2">
                {Loading ? (
                  <Skeleton className="w-full h-full bg-primary/10 border-2">
                    <Loader />
                  </Skeleton>
                ) : (
                  <p className="text-gray-500">No Image is Generated Yet</p>
                )}
              </div>
            )}
          </AspectRatio>
        </div>
      </div>
    </div>
  );
}

export default InputForm;
