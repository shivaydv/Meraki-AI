import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <h2 className="font-bold">404 | Page Not Found</h2>
      <p className="font-semibold py-4">Could not find requested resource</p>
      <Link
        href="/"
        className={buttonVariants({ size: "sm", variant: "default" })}
      >
        Return Home
      </Link>
    </div>
  );
}
