"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { useState, useRef, useCallback } from "react";
import FileSaver from "file-saver";
import { toast } from "sonner";
import { Download, Copy, ExternalLink } from "lucide-react";
import { useOutsideClick } from "@/hooks/use-outside-click"; // Import your hook
import Link from "next/link";

const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

export const PhotoCard = ({ item }: { item: any }) => {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Use the outside click hook to close the card when clicking outside
  const handleOutsideClick = useCallback(() => {
    if (isMobile() && isActive) {
      setIsActive(false);
    }
  }, [isActive]);

  useOutsideClick(cardRef, handleOutsideClick);

  const fallbackCopyTextToClipboard = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;

      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      textArea.style.opacity = "0";
      textArea.setAttribute("readonly", "");
      textArea.setAttribute("contenteditable", "true");

      document.body.appendChild(textArea);

      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, 99999);

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        toast.success("Prompt Text Copied Successfully");
      } else {
        toast.error("Copy failed. Please copy manually.");
      }
    } catch (error) {
      console.error("Fallback copy failed:", error);
      toast.error("Copy not supported on this device");
    }
  };

  const copyPrompt = async (prompt: string) => {
    try {
      if (
        navigator.clipboard &&
        navigator.clipboard.writeText &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(prompt);
        toast.success("Prompt Text Copied Successfully");
        return;
      }

      fallbackCopyTextToClipboard(prompt);
    } catch (error) {
      console.error("Clipboard API failed:", error);
      fallbackCopyTextToClipboard(prompt);
    }
  };

  const downloadImage = (image: string, prompt: string) => {
    try {
      FileSaver.saveAs(image, `${prompt.slice(0, 30)}.png`);
      toast.success("Download started");
    } catch (e) {
      toast.error("Download failed");
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (!isMobile()) return;

    e.stopPropagation();
    setIsActive(!isActive);
  };

  const handleCopyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    copyPrompt(item.prompt);
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadImage(item.image, item.prompt);
  };

  return (
    <motion.div
      ref={cardRef}
      key={item._id}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="mb-4 group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow relative"
      onClick={handleCardClick}
      onMouseEnter={() => {
        if (!isMobile()) setIsActive(true);
      }}
      onMouseLeave={() => {
        if (!isMobile()) setIsActive(false);
      }}
    >
      <Image
        src={item.image}
        width={500}
        height={500}
        alt={item.prompt}
        className="w-full h-auto object-cover"
        loading="lazy"
      />
      <motion.div
        initial={false}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`absolute inset-0 bg-background/60 text-foreground flex flex-col justify-between p-4 backdrop-blur-sm ${
          isActive ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Prompt */}
        <div className="">
          <p className="text-sm font-medium line-clamp-4">{item.prompt}</p>
        </div>
        {/* Action buttons */}
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-3">
            <button
              onClick={handleCopyClick}
              className=" flex items-center gap-1 hover:scale-110 transition-transform"
            >
              <Copy size={18} />
              <span className="text-xs">Copy</span>
            </button>
            <button
              onClick={handleDownloadClick}
              className=" flex items-center gap-1 hover:scale-110 transition-transform"
            >
              <Download size={18} />
              <span className="text-xs">Download</span>
            </button>
          </div>
          <Link
            href={item.image}
            target="_blank"
            className=" flex items-center gap-1 hover:scale-110 transition-transform"
          >
            <ExternalLink size={18} />
            <span className="text-xs">Open</span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};
