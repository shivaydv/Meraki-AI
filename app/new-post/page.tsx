import InputForm from "@/components/InputForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const page = () => {
  return (
    <main className="w-full flex flex-col py-6 gap-8 mb-4">
      <div className="flex justify-between items-center max-md:flex-col max-md:items-start gap-2">
        <div className="flex gap-4 flex-col ">
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl lg:text-5xl tracking-tighter max-w-xl text-left font-regular">
              Generate Your AI Image
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
              Just type your idea, and Meraki AI will create a custom image for
              you in seconds.
            </p>
          </div>
        </div>

        <Button size="lg" className="gap-4" variant="default" asChild>
          <Link href="/community" className="">
            View Community
          </Link>
        </Button>
      </div>
      <Separator className=" " />
      <InputForm />
    </main>
  );
};

export default page;
