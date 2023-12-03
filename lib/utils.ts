import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { surpriseMePrompts } from "./prompt";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomPrompt() {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];
  return randomPrompt;
}