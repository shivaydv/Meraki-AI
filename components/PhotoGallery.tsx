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
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              key={item._id}
              className="relative break-inside-avoid mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative group">
                <Image
                  src={item.image}
                  width={500}
                  height={500}
                  loading="lazy"
                  alt={item.prompt}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                  <p
                    className="font-semibold text-white text-lg line-clamp-3 cursor-pointer"
                    onClick={() => copyPrompt(item.prompt)}
                  >
                    {item.prompt}
                  </p>
                  <div className="flex justify-between items-center w-full">
                    <Download
                      className="text-white hover:scale-110 transition-transform duration-200 cursor-pointer"
                      onClick={() => downloadImage(item.image, item.prompt)}
                    />
                    <p className="font-semibold text-white text-sm">
                      ~ {item.name}
                    </p>
                  </div>
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
