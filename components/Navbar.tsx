"use client"
import Link from "next/link";
import Navigation from "./Navigation";
import { motion } from "motion/react";

const Navbar = () => {
  return (
    <header
     className="w-full z-[12] container bg-background h-16  flex justify-between items-center px-4 sticky top-0  ">

      <Link href="/">
        <h1 className="text-xl font-bold">Meraki AI</h1>
      </Link>
      <Navigation />
    </header>
  );
};

export default Navbar;
