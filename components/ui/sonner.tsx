"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group bg-red-400 "
      style={
        {
          "--normal-bg": "var(--color-background)",
          "--normal-text": "var(--color-foreground)",
          "--normal-border": "var(--color-border)",
        } as React.CSSProperties
      }
      position="top-right"
      closeButton={true}
      richColors={true}
      duration={2000}
      toastOptions={{
        cancelButtonStyle: {
          direction: "rtl",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
