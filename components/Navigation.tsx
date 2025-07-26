"use client";

import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { Github, Moon, Sun, TwitterIcon } from "lucide-react";
import Link from "next/link";

const Navigation = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="justify-center items-center flex gap-2 ">
      <Link href="https://x.com/Shivay1256" target="_blank" rel="noopener noreferrer">
        <Button size="icon" variant="ghost">
          <TwitterIcon className="h-[1.2rem] w-[1.2rem] " />
        </Button>
      </Link>
      <Link href="https://github.com/shivaydv/meraki-ai" target="_blank" rel="noopener noreferrer">
        <Button size="icon" variant="ghost">
          <Github className="h-[1.2rem] w-[1.2rem] " />
        </Button>
      </Link>
      <Button
        size="sm"
        onClick={() =>
          theme == "light" ? setTheme("dark") : setTheme("light")
        }
        variant={"ghost"}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};

export default Navigation;
