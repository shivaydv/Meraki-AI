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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  prompt: z
    .string()
    .min(4, { message: "Prompt must be at least 4 characters" }),
});

export function InputFrom() {
  const [Data, setData] = useState<any>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      prompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, prompt } = values;
    const res = await axios.post("http://localhost:3000/api/generate", {
      name,
      prompt,
    });
    setData(JSON.stringify(res.data));
    toast({title:"Message",description:"Sample Test Success"})
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 md:space-y-4 max-w-md w-full   "
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
        <Button type="submit">Generate</Button>
        
      </form>
    </Form>
  );
}
export default InputFrom;
