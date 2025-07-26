"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";

import Floating, { FloatingElement } from "@/components/FloatingElement";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const images = [
  "http://res.cloudinary.com/dvkau07l1/image/upload/v1753444668/sebdxoverlv3ytzjhi12.jpg",
  "http://res.cloudinary.com/dvkau07l1/image/upload/v1753444621/n3m4etw86quxu5bzrczh.jpg",
  "http://res.cloudinary.com/dvkau07l1/image/upload/v1753447566/v2ssudjm7i41jfdguovf.jpg",
  "http://res.cloudinary.com/dvkau07l1/image/upload/v1752865320/cyu16clzogacc04d6pep.jpg",
  "	http://res.cloudinary.com/dvkau07l1/image/upload/v1753444860/rnipnelakcyakx5umrdt.jpg",
  "http://res.cloudinary.com/dvkau07l1/image/upload/v1753444712/oiaqwfgdla6gwcl5hr0w.jpg",
  "http://res.cloudinary.com/dvkau07l1/image/upload/v1752315848/jdqfbv8lbcps3efk5v6j.jpg",
  "http://res.cloudinary.com/dvkau07l1/image/upload/v1753447794/hxm6pa1dw18jmmsikcsj.jpg",
];

const Home = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "img",
      { opacity: [0, 1] },
      { duration: 0.5, delay: stagger(0.15) }
    );
  }, []);

  return (
    <div
      className="flex w-dvw h-dvh justify-center items-center  overflow-hidden relative"
      ref={scope}
    >
      <BgGradient />
      <FloatingImages />
      <motion.div
        className="z-50 text-center space-y-4 items-center flex flex-col "
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 0.9 }}
      >
        <CenterContent />
      </motion.div>
    </div>
  );
};

const FloatingImages = () => {
  return (
    <Floating sensitivity={-0.8} className="h-full">
      <FloatingElement
        depth={0.5}
        className="top-[15%] left-[2%] md:top-[25%] md:left-[5%] "
      >
        <motion.img
          src={images[6]}
          initial={{ opacity: 0 }}
          className="w-20 h-16 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-cover hover:scale-105 duration-200  transition-transform -rotate-[3deg] shadow-2xl rounded-xl"
        />
      </FloatingElement>
      <FloatingElement
        depth={1}
        className="top-[0%] left-[8%] md:top-[6%] md:left-[11%] "
      >
        <motion.img
          src={images[1]}
          initial={{ opacity: 0 }}
          className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48 object-cover hover:scale-105 duration-200  transition-transform -rotate-12 shadow-2xl rounded-xl"
        />
      </FloatingElement>

      <FloatingElement
        depth={4}
        className="top-[88%] left-[6%] md:top-[75%] md:left-[8%]"
      >
        <motion.img
          src={images[2]}
          initial={{ opacity: 0 }}
          className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover -rotate-[4deg] hover:scale-105 duration-200  transition-transform shadow-2xl rounded-xl"
        />
      </FloatingElement>
      <FloatingElement
        depth={2}
        className="top-[0%] left-[72%] md:top-[2%] md:left-[83%]"
      >
        <motion.img
          src={images[3]}
          initial={{ opacity: 0 }}
          className="w-32 h-32 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56 object-cover hover:scale-105 duration-200  transition-transform shadow-2xl rotate-[10deg] rounded-xl"
        />
      </FloatingElement>
      <FloatingElement
        depth={1}
        className="top-[78%] left-[70%] md:top-[68%] md:left-[83%]"
      >
        <motion.img
          src={images[4]}
          initial={{ opacity: 0 }}
          className="w-60 h-44 sm:w-72 sm:h-64 md:w-80 md:h-72 lg:w-96 lg:h-80 object-cover hover:scale-105 duration-200  transition-transform shadow-2xl rotate-[19deg] rounded-xl"
        />
      </FloatingElement>
    </Floating>
  );
};

const CenterContent = () => {
  return (
    <div className="flex gap-4 py-4 items-center justify-center flex-col max-md:px-6 ">
      <div className="flex content-center">
        <div className="relative rounded-full px-2 py-1 text-xs sm:px-3 sm:text-sm/6  ring-1 ring-ring transition-all justify-center items-center flex  text-primary font-semibold">
          Meraki AI
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
          className="justify-center items-center gap-2 font-semibold"
          asChild
        >
          <Link href="/new-post" className="">
            Generate Your Image <ChevronRight className="w-4 h-4" />
          </Link>
        </Button>
        <Button
          size="lg"
          className="gap-4 font-semibold"
          variant="outline"
          asChild
        >
          <Link href="/community" className="">
            Explore Community
          </Link>
        </Button>
      </div>
    </div>
  );
};

const BgGradient = () => {
  const gradientColors = {
    from: "oklch(0.646 0.222 41.116)",
    to: "oklch(0.488 0.243 264.376)",
  };

  return (
    <>
      {/* Top gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 "
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 94.1%)",
            background: `linear-gradient(to top right, ${gradientColors?.from}, ${gradientColors?.to})`,
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] min-h-screen"
        />
      </div>

      {/* Bottom gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] "
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            background: `linear-gradient(to top right, ${gradientColors?.from}, ${gradientColors?.to})`,
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.185rem] "
        />
      </div>
    </>
  );
};
export default Home;
