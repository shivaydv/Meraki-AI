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
import { useState, useCallback, useRef } from "react";

import { toast } from "sonner";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";

import { getRandomPrompt } from "@/lib/utils";
import Loader from "./Loader";

import FileSaver from "file-saver";
import { Label } from "./ui/label";
import { AutosizeTextarea } from "./ui/textarea";
import React from "react";

const formSchema = z.object({
  prompt: z
    .string()
    .min(4, { message: "Prompt must be at least 4 characters" })
    .max(2000, { message: "Prompt must be at most 2000 characters" }),
});

export function InputForm() {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  // Possible values: 'idle', 'loading', 'sharing', 'uploaded'
  const [status, setStatus] = useState<"idle" | "loading" | "sharing" | "uploaded">("idle");
  const [promptData, setPromptData] = useState({
    prompt: "",
    model: "flux",
    size: "Square",
  });
  const [promptError, setPromptError] = useState<string | null>(null);
  // Track the aspect ratio used for the last generated image
  const [lastGeneratedSize, setLastGeneratedSize] = useState<string>("Square");
  const isMounted = useRef(true);

  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setPromptData((prev) => ({ ...prev, [name]: value }));
      if (name === "prompt") {
        try {
          formSchema.parse({ prompt: value });
          setPromptError(null);
        } catch (err: any) {
          setPromptError(err.errors?.[0]?.message || "Invalid prompt");
        }
      }
    },
    []
  );

  const handleModelChange = useCallback((value: string) => {
    setPromptData((prev) => ({ ...prev, model: value }));
  }, []);

  const handleSizeChange = useCallback((value: string) => {
    setPromptData((prev) => ({ ...prev, size: value }));
  }, []);

  const validatePrompt = useCallback(() => {
    try {
      formSchema.parse({ prompt: promptData.prompt });
      setPromptError(null);
      return true;
    } catch (err: any) {
      setPromptError(err.errors?.[0]?.message || "Invalid prompt");
      return false;
    }
  }, [promptData.prompt]);

  const uploadImage = useCallback(async () => {
    if (!imageUrl || !promptData.prompt) {
      toast.error("No image or prompt to share");
      return;
    }
    try {
      setStatus("sharing");
      const { prompt } = promptData;
      const res = await axios.post(`/api/share`, {
        prompt,
        image: imageUrl,
      });
      if (res.data.status === 200) {
        toast.success("Image Shared in Community");
        if (isMounted.current) setStatus("uploaded");
      } else {
        toast.error("Can't Share in Community");
        if (isMounted.current) setStatus("idle");
      }
    } catch (error) {
      toast.error("Something went Wrong");
      if (isMounted.current) setStatus("idle");
    }
  }, [imageUrl, promptData]);

  const downloadImage = useCallback(
    (image: string) => {
      if (imageUrl && promptData.prompt) {
        FileSaver.saveAs(image, promptData.prompt);
        toast.success("Downloading Started");
      } else {
        toast.error("Download Failed");
      }
    },
    [imageUrl, promptData.prompt]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!validatePrompt()) return;
      try {
        setStatus("loading");
        setImageUrl(undefined);
        if (isMounted.current) setStatus("loading");
        const res = await axios.post(`/api/generate`, {
          promptData,
        });
        if (isMounted.current) {
          setImageUrl(res.data.imageUrl);
          setLastGeneratedSize(promptData.size); // Set the aspect ratio used for this image
          setStatus("idle");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went Wrong");
        if (isMounted.current) setStatus("idle");
      }
    },
    [promptData, validatePrompt]
  );

  const surpriseMe = useCallback(() => {
    const promptString = getRandomPrompt();
    setPromptData((prev) => ({ ...prev, prompt: promptString }));
    setPromptError(null);
  }, []);

  // Use the aspect ratio for the last generated image, or the current selection if no image
  const getAspectRatio = useCallback((size: string) => {
    switch (size) {
      case "Vertical":
        return 9 / 16;
      case "Landscape":
        return 16 / 9;
      default:
        return 1;
    }
  }, []);

  // Button enable/disable logic
  const isLoading = status === "loading";
  const isSharing = status === "sharing";
  const isUploaded = status === "uploaded";
  const isGenerateDisabled = isLoading || isSharing || !promptData.prompt || !!promptError;
  const isDownloadDisabled = !imageUrl || isLoading;
  const isShareDisabled = !imageUrl || isSharing || isUploaded || isLoading;

  // Use lastGeneratedSize for the aspect ratio of the displayed image
  const aspectRatioForImage = imageUrl ? getAspectRatio(lastGeneratedSize) : getAspectRatio(promptData.size);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 ">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full md:w-1/2 "
          autoComplete="off"
          aria-disabled={isLoading}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Select
                  required
                  value={promptData.model}
                  name="model"
                  onValueChange={handleModelChange}
                  disabled={isLoading}
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
                  onValueChange={handleSizeChange}
                  disabled={isLoading}
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
              <AutosizeTextarea
                id="prompt"
                placeholder="Enter Your Prompt here..."
                name="prompt"
                value={promptData.prompt}
                onChange={handleChange}
                required
                minHeight={10}
                maxLength={2000}
                className="w-full resize-none"
                autoComplete="off"
                aria-invalid={!!promptError}
                aria-describedby="prompt-error"
                disabled={isLoading}
              />
              {promptError && (
                <p id="prompt-error" className="text-red-500 text-sm">
                  {promptError}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isGenerateDisabled}
                aria-disabled={isGenerateDisabled}
                aria-busy={isLoading}
              >
                {isLoading ? (
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
                disabled={isLoading}
                aria-disabled={isLoading}
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
                  disabled={isDownloadDisabled}
                  aria-disabled={isDownloadDisabled}
                >
                  Download
                </Button>
                <Button
                  onClick={uploadImage}
                  className="w-full"
                  type="button"
                  disabled={isShareDisabled}
                  aria-disabled={isShareDisabled}
                >
                  {isSharing ? (
                    <>
                      <Loader />
                      <p className="pl-2">Sharing</p>
                    </>
                  ) : isUploaded ? (
                    "Shared"
                  ) : (
                    "Share in Community"
                  )}
                </Button>
              </div>
            )}
          </div>
        </form>

        <div
          className={`w-full mx-auto md:w-1/2  ${
            lastGeneratedSize == "Vertical" ? "max-w-sm" : "max-w-md"
          }`}
        >
          <AspectRatio ratio={aspectRatioForImage}>
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
                {isLoading ? (
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
