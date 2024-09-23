"use client"
import Link from "next/link";
import Navigation from "./Navigation";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.header
    initial={{ opacity: 0, y: -30,filter: "blur(10px)" }}
    animate={{ opacity: 1, y: 0 , filter: "blur(0px)"}}
    transition={{ duration: 0.5,delay:1 }}
     className="w-full z-[12] container bg-background h-16  flex justify-between items-center px-4 sticky top-0  ">

      <Link href="/">
        <h1 className="text-xl font-bold">Meraki AI</h1>
      </Link>
      <Navigation />
    </motion.header>
  );
};

export default Navbar;
