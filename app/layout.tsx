import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
  openGraph: {
    type: "website",
    url: "https://meraki-ai.vercel.app",
    title: "Meraki Ai",
    description:
      "Meraki Ai is a platform that generates images based on text prompts using AI.",
    images: [
      {
        url: "./OpenGraph.png",
        width: 800,
        height: 600,
        alt: "Meraki Ai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@meraki_ai",
    title: "Meraki Ai",
    description:
      "Meraki Ai is a platform that generates images based on text prompts using AI.",
    images: {
      url: "./twitter.png",
      width: 1200,
      height: 630,
      alt: "Meraki Ai",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <main className=" flex flex-col min-h-screen mx-auto  relative">
            <Navbar />
            <div className="flex-1 flex container mx-auto w-full px-4 pt-2.5">
              {children}
            </div>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
