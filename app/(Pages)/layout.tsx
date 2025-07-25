import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" flex flex-col mx-auto  relative">
      <Navbar />
      <div className="flex-1 flex container mx-auto w-full px-4 pt-2.5">
        {children}
      </div>
    </main>
  );
}
