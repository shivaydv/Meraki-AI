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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Alert } from "./ui/alert";
import { toast } from "./ui/use-toast";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";
import { ImageIcon, Upload } from "lucide-react";
import { getRandomPrompt } from "@/lib/utils";
import Loader from "./Loader";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  prompt: z
    .string()
    .min(4, { message: "Prompt must be at least 4 characters" }),
});

export function InputFrom() {
  const [ImageUrl, setImageUrl] = useState<any>();
  const [Loading, setLoading] = useState<boolean>(false);
  const [Sharing, setSharing] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      prompt: "",
    },
  });

  async function uploadImage() {
    try {
      setSharing(true)
      const { name, prompt } = form.getValues();
     
      const res = await axios.post("http://localhost:3000/api/share", {
        name,
        prompt,
        image:ImageUrl,
      });
      toast({
        title: "Message",
        description: "Shared Successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went Wrong",
        variant: "destructive",
      });
    }finally{
      setSharing(false)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const { name, prompt } = values;
      const res = await axios.post("http://localhost:3000/api/generate", {
        name,
        prompt,
      });
      setImageUrl(res.data);
    } catch (error) {
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
    form.setValue("prompt", promptString);
  };

  return (
    <Form {...form}>
      <div className="flex justify-around items-center flex-col lg:flex-row max-lg:gap-4">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md w-full   "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Give a detailed description of Image</FormLabel>
                <Button
                  type="button"
                  className="ml-4 bg-slate-200 hover:bg-slate-300"
                  size={"sm"}
                  variant="secondary"
                  onClick={surpriseMe}
                >
                  Surprise me
                </Button>
                <FormControl>
                  <Input placeholder="Enter Your Prompt here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" space-y-4 pt-4">
            <Button
              type="submit"
              className="w-full "
              disabled={Loading ? true : false}
            >
              {Loading?<Loader/>:"Generate"}
            </Button>
            {ImageUrl && (
              <Button type="button" className="w-full" onClick={uploadImage} disabled={Sharing ? true : false}>
                {Sharing?<Loader/>:"Share with Community"}
              </Button>
            )}
          </div>
        </form>
        <div className="w-[350px]">
          <AspectRatio ratio={1 / 1}>
            {ImageUrl ? (
              <Image
                src={`${ImageUrl}`}
                fill
                className="rounded-lg object-cover aspect-square border-2 border-primary"
                alt="test image"
              />
              
            ) : (
              <div className="w-full h-full flex justify-center items-center bg-gray-200 rounded-lg flex-col gap-2">
                {Loading ? (
                  <Skeleton className="w-full bg-primary/40 h-full border-2" />
                ) : (
                  <ImageIcon size={50} />
                )}
              </div>
            )}
          </AspectRatio>
        </div>
      </div>
    </Form>
  );
}
export default InputFrom;
