import Link from "next/link";
import Navigation from "./Navigation";

const Navbar = () => {
  return (
    <header className="w-full z-[12] bg-muted h-16  flex justify-between items-center px-4  border-b-2 sticky top-0  ">
      <Link href="/">
        <h1 className="text-xl font-bold ">AI Image Gen</h1>
      </Link>
      <Navigation />
    </header>
  );
};

export default Navbar;
