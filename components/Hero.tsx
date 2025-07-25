"use client";
import { ChevronRight, MoveRight, PhoneCall } from "lucide-react";
import { Button } from "./ui/button";
import GradientText from "./GradientText";
import Link from "next/link";
import { motion } from "motion/react";

const Hero = () => (
  <div className="w-full ">
    <div className="container mx-auto">
      <div className="flex gap-4 py-20 lg:py-40 items-center justify-center flex-col">
        <div>
          <div className="flex items-center justify-center gap-2  border  rounded-full px-4 py-1 bg-background backdrop-blur-md">
            <span
              className={`inline  bg-linear-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-size-[var(--bg-size)_100%] bg-clip-text text-transparent`}
            >
              Create Your Masterpiece
            </span>
          </div>
        </div>
        <div className="flex gap-4 flex-col">
          <h1 className="text-4xl md:text-7xl max-w-2xl tracking-tighter text-center font-semibold">
            Transform Your Imagination into Art
          </h1>
          <p className="text-base md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
            Easily generate stunning images by providing a simple prompt. Our
            advanced AI interprets your words and transforms them into beautiful
            visuals!
          </p>
        </div>
        <div className="flex flex-row gap-6 mt-5 max-sm:flex-col w-full justify-center ">
          <Button
            size="lg"
            className="justify-center items-center gap-2 "
            asChild
          >
            <Link href="/new-post" className="">
              Generate Your Image <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" className="gap-4" variant="outline" asChild>
            <Link href="/community" className="">
              Explore Community
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
