"use client";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { ImageIcon } from "lucide-react";
import { cn, getRandomPrompt } from "@/lib/utils";
import Loader from "./Loader";

import FileSaver from "file-saver";
import { Label } from "./ui/label";
import { AutosizeTextarea } from "./ui/textarea";

const formSchema = z.object({
  prompt: z
    .string()
    .min(4, { message: "Prompt must be at least 4 characters" }),
});

export function InputFrom() {
  const [ImageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [Loading, setLoading] = useState<boolean>(false);
  const [Sharing, setSharing] = useState<boolean>(false);
  const [Uploaded, setUploaded] = useState<boolean>(false);
  const [promptData, setpromptData] = useState({
    prompt: "",
    model: "Normal",
    size: "1:1",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setpromptData({ ...promptData, [name]: value });
    console.log(promptData);
  };

  async function uploadImage() {
    try {
      setSharing(true);
      const { prompt } = promptData;
      const res = await axios.post(`/api/share`, {
        prompt,
        image: ImageUrl,
      });
      if (res.data.status == 200) {
        toast({
          title: "Message",
          description: "Shared Successfully!",
          className: "",
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
    if (ImageUrl) {
      const { prompt } = promptData;
      FileSaver.saveAs(image, prompt);
      toast({
        title: "Message",
        description: "Downloading Started",
        className: "",
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
    console.log(promptData);
    // try {
    //   setLoading(true);
    //   setImageUrl(undefined);
    //   setUploaded(false);

    //   const res = await axios.post(`/api/generate`, {
    //     prompt,
    //   });

    //   setImageUrl(res.data);
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Something went Wrong",
    //     variant: "destructive",
    //   });
    // } finally {
    //   setLoading(false);
    // }
    setpromptData({ ...promptData, prompt: "" });
  }

  const surpriseMe = () => {
    const promptString = getRandomPrompt();
    setpromptData({ ...promptData, prompt: promptString });
    // console.log(promptData);
  };

  return (
    <div>
      <div className="flex justify-between items-center flex-col lg:flex-row max-md:gap-4 max-md:px-2 md:px-10">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-md w-full flex flex-col  justify-center items-center gap-4"
        >
          <div className="space-y-2 w-full">
            <div className="flex gap-4 flex-wrap">
              <div>
                <Label htmlFor="name">Model</Label>

                <Select
                  required
                  value={promptData.model}
                  name="model"
                  onValueChange={(e) =>
                    setpromptData({ ...promptData, model: e })
                  }
                >
                  <SelectTrigger className="w-[180px] ">
                    <SelectValue placeholder="Select Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Model</SelectLabel>
                      <SelectItem value="3D">3D</SelectItem>
                      <SelectItem value="Anime">Anime</SelectItem>
                      <SelectItem value="Realistic">Realistic</SelectItem>
                      <SelectItem value="Normal">Normal</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="name">Size</Label>

                <Select
                  required
                  value={promptData.size}
                  name="model"
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
                      <SelectItem value="16:9">16:9</SelectItem>
                      <SelectItem value="1:1">1:1</SelectItem>
                      <SelectItem value="9:16">9:16</SelectItem>
                      <SelectItem value="4:3">4:3</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2  items-center">
              <Label htmlFor="name">Prompt</Label>
              {/* <Button
            type="button"
            size={"sm"}
            variant={"ghost"}
            onClick={surpriseMe}
            className="w-fit"
          >
            Get Random Prompt{" "}
          </Button> */}
            </div>
            <AutosizeTextarea
              id="prompt"
              placeholder="Enter Your Prompt here..."
              name="prompt"
              value={promptData.prompt}
              onChange={handleChange}
              required
              className="resize-none w-full"
              maxHeight={200}
              autoComplete="off"
            />
          </div>

          <Button type="submit" className="w-fit" disabled={Loading}>
            {Loading ? <Loader /> : "Generate"}
          </Button>
        </form>

        <div className=" w-full lg:w-[450px]">
          <AspectRatio ratio={1 / 1}>
            {ImageUrl ? (
              <Image
                src={`${ImageUrl}`}
                loading="lazy"
                fill
                className={cn(
                  "rounded-lg object-cover aspect-square bg-primary/30 border-primary shadow-lg",
                  Loading && "animate-pulse"
                )}
                alt="AI Generated Image"
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center bg-muted border-2 rounded-lg flex-col gap-2 ">
                {Loading ? (
                  <Skeleton className="w-full bg-primary/30 h-full border-2" />
                ) : (
                  <ImageIcon size={50} />
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
