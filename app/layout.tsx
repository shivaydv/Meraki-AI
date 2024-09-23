import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Template from "./template";


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
  title: "AI Image Generation",
  description: "Tool which convert Text to Image",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >

        <main className=" flex flex-col min-h-screen mx-auto  relative">
          <Navbar />
          <div className="flex-1 flex container mx-auto w-full px-4 pt-2.5">
            {/* <Template> */}

            {children}
            {/* </Template> */}
          </div>
        </main>
        <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}
