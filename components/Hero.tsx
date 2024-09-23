"use client"
import { ChevronRight, MoveRight, PhoneCall } from "lucide-react";
import { Button } from "./ui/button";
import GradientText from "./GradientText";
import Link from "next/link";
import {motion} from "framer-motion"
import BackgroundGrid from "./Gridbackground";


 const Hero = () => (
  <div className="w-full ">
    {/* <BackgroundGrid color={"#505050"} cellSize={"60px"} /> */}
    <div className="container mx-auto">
      <div className="flex gap-4 py-20 lg:py-40 items-center justify-center flex-col">
        <motion.div
        initial={{ opacity: 0, y: 50,filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0 , filter: "blur(0px)"}}
        transition={{duration: 0.5,delay:1} }
        >
          <GradientText>
        <span
          className={
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
          }
        >
        Create Your Masterpiece
        </span>
        </GradientText>
        </motion.div>
        <div className="flex gap-4 flex-col">
          <motion.h1
          initial={{ opacity: 0, y:50 ,filter: "blur(10px)" }}
          animate={{ opacity: 1, y:0, filter: "blur(0px)"}}
          transition={{duration: 0.5} }
           className="text-4xl md:text-7xl max-w-2xl tracking-tighter text-center font-semibold">
          Transform Your Imagination into Art
          </motion.h1>
          <motion.p
          initial={{ opacity: 0, y: 50,filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 1 , filter: "blur(0px)"}}
          transition={{duration: 0.5,delay:0.5} }
          className="text-base md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
          Easily generate stunning images by providing a simple prompt. Our advanced AI interprets your words and transforms them into beautiful visuals!
          </motion.p>
        </div>
        <motion.div
        initial={{ opacity: 0, y: 50,filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0 , filter: "blur(0px)"}}
        transition={{duration: 0.5,delay:1} }
         className="flex flex-row gap-6 mt-5 max-sm:flex-col w-full justify-center ">
          <Button size="lg" className="justify-center items-center gap-2 " asChild>
            <Link href="/new-post" className="">
              Generate Your Image <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" className="gap-4"  variant="outline" asChild>
          <Link href="/community" className="">
            Explore Community
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  </div>
);

export default Hero
