import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meraki Ai",
  description:
    "Meraki Ai is a platform that generates images based on text prompts using AI. It is a simple and easy-to-use tool that allows you to create images for your projects, presentations, and social media posts. Just enter a text prompt, select a model, and choose the size of the image you want to generate. Meraki Ai will generate an image based on your input and provide you with a high-quality image that you can download and use in your projects. With 5+ Models to choose from, you can create a wide variety of images for different purposes. Try Meraki Ai today and see how easy it is to generate images with AI.",
  keywords: [
    "AI image generation",
    "text to image",
    "Meraki Ai",
    "AI tools",
    "image creation",
    "AI models",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
