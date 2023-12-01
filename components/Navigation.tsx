"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

const Navigation = () => {
  const pathname = usePathname();
  return (
    <div>
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
