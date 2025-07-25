import Link from "next/link";
import Navigation from "./Navigation";

const Navbar = () => {
  return (
    <header className="w-full z-12 container bg-background h-16  flex justify-between items-center px-4 sticky top-0 border-b ">
      <Link href="/">
        <h1 className="text-xl font-semibold tracking-tight  ">MERAKI AI</h1>
      </Link>
      <Navigation />
    </header>
  );
};

export default Navbar;
