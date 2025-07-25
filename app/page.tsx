"use client";
import Hero from "@/components/Hero";
import BorderBeam from "@/components/ui/BorderBeam";
import { motion } from "motion/react";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      {/* <div className="px-2 lg:-mt-10  h-full w-full flex justify-center items-center mb-20 ">
        <motion.div
          initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 1 }}
          style={{
            maskImage: `linear-gradient(to top, transparent , black 80% )`,
          }}
          className=" aspect-video shadow-2xl relative lg:h-[520px]  overflow-hidden rounded-2xl  bg-primary dark:bg-muted md:rounded-2xl p-2 "
        >
          <Image
            src={`/hero-img.jpg`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-top-left "
            draggable={false}

          />
          <BorderBeam borderWidth={3} size={400} duration={8} delay={5}  />
        </motion.div>
      </div> */}
    </div>
  );
}
