"use client";

import axios from "axios";
import Image from "next/image";
import FileSaver from "file-saver";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { toast } from "./ui/use-toast";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

const PhotoGallery = () => {


  const [Data, setData] = useState<any[]>([]);
  const [Error, setError] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(true);

  const getPost = async () => {
    try {
      const res =axios.get(`/api/all-post`);
      setData((await res).data);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast({ title: "Message", description: "Prompt Text Copied Successfully",className:" bg-primary text-primary-foreground shadow-lg border-none" });
  };

  const downloadImage = (image: string, prompt: string) => {
    FileSaver.saveAs(image, prompt);
    toast({ title: "Message", description: "Downloading Started" ,className:""});
  };

  useEffect(() => {
    getPost();
  }, []);


  return (
    <div >
      {Loading ? (
        <div className="flex h-48 justify-center items-center ">
          <Loader />
        </div>
      ) : (
        <div className=" sm:columns-2 md:columns-3 columns-1  sm:gap-3 space-y-3 pb-10  ">
          {Array.isArray(Data) && Data.slice(0).reverse().map((item: any,index) => (
            <motion.div
              initial={{ opacity: 0, y: 20,filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0 , filter: "blur(0px)"}}
              transition={{duration: 0.5} }
              key={item._id}
              className="relative break-inside-avoid w-full h-full group flex justify-center"
            >
              <Image
                src={item.image}
                width={500}
                height={500}
                loading="lazy"
                alt={item.prompt}
                className="rounded-md z-10 object-contain"
              />

              <div className="group-hover:opacity-80 opacity-0 justify-between flex-col h-full items-center p-4 absolute z-10 w-full bg-muted bottom-0 flex transition-all ease-in-out duration-200 ">
                <p
                  className="font-semibold  text-xl text-clip capitalize cursor-pointer select-none"
                  onClick={() => copyPrompt(item.prompt)}
                >
                  {item.prompt}
                </p>
                <div className="flex justify-between w-full py-3 self-baseline">
                  <Download
                    className="hover:scale-125 ease-in-out transition-all duration-100"
                    onClick={() => {
                      downloadImage(item.image, item.prompt);
                    }}
                  />
                  <p className=" font-semibold capitalize text-md select-none"
                  >
                    ~ {item.name}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      )}
      {Error && (
        <div className="flex h-48 justify-center items-center">
          <h1 className="text-3xl">No Post Found</h1>
        </div>
      )}
    </div>
  );
};



export default PhotoGallery;
