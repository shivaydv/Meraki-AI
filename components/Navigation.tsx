"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";


const Navigation = () => {

  const {setTheme}= useTheme()

  const pathname = usePathname();
  return (
    <div className="justify-center items-center flex gap-3 ">
       <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button   size="sm">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
      {pathname == "/" ? (
        <Link
          href="/new-post"
          className={buttonVariants({
            size: "sm",
            className: "tracking-wide ",
          })}
        >
          Generate Image{" "}
        </Link>
      ) : (
        <Link
          href="/"
          className={buttonVariants({
            size: "sm",
            className: "tracking-wide ",
          })}
        >
          Community Posts
        </Link>
      )}
    </div>
  );
};

export default Navigation;
