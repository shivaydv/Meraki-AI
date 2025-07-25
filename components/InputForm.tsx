"use client";
import axios from "axios";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { getRandomPrompt } from "@/lib/utils";
import Loader from "./Loader";
import FileSaver from "file-saver";
import { Label } from "./ui/label";
import { AutosizeTextarea } from "./ui/textarea";
import React from "react";

const formSchema = z.object({
  prompt: z
    .string()
    .min(4, "Prompt must be at least 4 characters")
    .max(2000, "Prompt must be at most 2000 characters"),
});

const aspectRatios = {
  Square: 1,
  Vertical: 9 / 16,
  Landscape: 16 / 9,
};

export default function InputForm() {
  const [form, setForm] = useState({
    prompt: "",
    model: "flux",
    size: "Square",
  });
  const [imageUrl, setImageUrl] = useState<string>();
  const [status, setStatus] = useState<
    "idle" | "loading" | "sharing" | "uploaded"
  >("idle");
  const [promptError, setPromptError] = useState<string | null>(null);
  const [lastSize, setLastSize] = useState("Square");
  const [lastPrompt, setLastPrompt] = useState("");

  const isLoading = status === "loading";
  const isSharing = status === "sharing";
  const isUploaded = status === "uploaded";

  const validatePrompt = (prompt: string) => {
    try {
      formSchema.parse({ prompt });
      setPromptError(null);
      return true;
    } catch (err: any) {
      setPromptError(err.errors?.[0]?.message || "Invalid prompt");
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "prompt") validatePrompt(value);
  };

  const handleSelect = (name: string, value: string) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePrompt(form.prompt)) return;
    setStatus("loading");
    setImageUrl(undefined);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ promptData: form }),
        headers: { "Content-Type": "application/json" },
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
      setLastSize(form.size);
      setLastPrompt(form.prompt); // Save the prompt used for generation
      setStatus("idle");
    } catch {
      toast.error("Something went Wrong");
      setStatus("idle");
    }
  };

  const uploadImage = async () => {
    if (!imageUrl || !lastPrompt)
      return toast.error("No image or prompt to share");
    setStatus("sharing");

    const blob = await fetch(imageUrl).then((r) => r.blob());
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", "meraki-ai");

    try {
      const uploadRes = await fetch(
        "https://api.cloudinary.com/v1_1/dvkau07l1/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();
      const uploadedURL = uploadData.secure_url;

      const res = await axios.post(`/api/share`, {
        prompt: lastPrompt,
        image: uploadedURL,
      });

      if (res.data.status === 200) {
        toast.success("Image Shared in Community");
        setStatus("uploaded");
      } else {
        toast.error("Can't Share in Community");
        setStatus("idle");
      }
    } catch {
      toast.error("Something went Wrong");
      setStatus("idle");
    }
  };

  const downloadImage = () => {
    if (imageUrl && form.prompt) {
      FileSaver.saveAs(imageUrl, form.prompt);
      toast.success("Downloading Started");
    } else {
      toast.error("Download Failed");
    }
  };

  const surpriseMe = () => {
    setForm((prev) => ({ ...prev, prompt: getRandomPrompt() }));
    setPromptError(null);
  };

  const aspectRatio = imageUrl
    ? aspectRatios[lastSize as keyof typeof aspectRatios]
    : aspectRatios[form.size as keyof typeof aspectRatios];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-10 justify-between">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 space-y-6 p-6 rounded-xl border border-border shadow-sm h-fit"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-muted-foreground">
                Model
              </Label>
              <Select
                value={form.model}
                onValueChange={(v) => handleSelect("model", v)}
                disabled={isLoading}
              >
                <SelectTrigger className="text-sm rounded-lg border border-border">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="flux">Normal</SelectItem>
                    <SelectItem value="kontext">Kontext</SelectItem>
                    <SelectItem value="turbo">Turbo</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-muted-foreground">
                Size
              </Label>
              <Select
                value={form.size}
                onValueChange={(v) => handleSelect("size", v)}
                disabled={isLoading}
              >
                <SelectTrigger className="text-sm rounded-lg border border-border">
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Square">Square</SelectItem>
                    <SelectItem value="Vertical">Vertical</SelectItem>
                    <SelectItem value="Landscape">Landscape</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">
              Prompt
            </Label>
            <AutosizeTextarea
              name="prompt"
              id="prompt"
              placeholder="Describe your vision..."
              value={form.prompt}
              onChange={handleChange}
              required
              maxLength={2000}
              minHeight={10}
              className="text-sm rounded-lg resize-none"
              autoCorrect="off"
              spellCheck="false"
              disabled={isLoading}
            />
            {promptError && (
              <p className="text-sm text-destructive">{promptError}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || isSharing || !form.prompt || !!promptError}
            >
              {isLoading ? (
                <>
                  <Loader />
                  <span className="ml-2">Generating</span>
                </>
              ) : (
                "Generate"
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full border border-border"
              onClick={surpriseMe}
              disabled={isLoading}
            >
              Surprise Me
            </Button>
          </div>
          {imageUrl && (
            <div className="grid grid-cols-2 gap-4 pt-2">
              <Button
                onClick={downloadImage}
                className="w-full"
                type="button"
                disabled={isLoading}
              >
                Download
              </Button>
              <Button
                onClick={uploadImage}
                className="w-full"
                type="button"
                disabled={isSharing || isUploaded || isLoading}
              >
                {isSharing ? (
                  <>
                    <Loader />
                    <span className="ml-2">Sharing</span>
                  </>
                ) : isUploaded ? (
                  "Shared"
                ) : (
                  "Share in Community"
                )}
              </Button>
            </div>
          )}
        </form>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          <div
            className={`w-full flex justify-center items-center ${
              (imageUrl ? lastSize : form.size) === "Vertical"
                ? "max-w-xs"
                : (imageUrl ? lastSize : form.size) === "Landscape"
                ? "max-w-xl"
                : "max-w-md"
            }`}
          >
            <AspectRatio ratio={aspectRatio}>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  loading="lazy"
                  fill
                  className="rounded-xl border border-border shadow-lg object-cover"
                  alt="AI Generated Image"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center rounded-xl border text-muted-foreground">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Image not generated yet
                    </p>
                  )}
                </div>
              )}
            </AspectRatio>
          </div>
        </div>
      </div>
    </div>
  );
}
