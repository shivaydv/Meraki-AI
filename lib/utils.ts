import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { surpriseMePrompts } from "./prompt";
// import {getPlaiceholder} from "plaiceholder"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomPrompt() {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];
  return randomPrompt;
}

export async function getBase64(src:string){
const buffer = Buffer.from(src);
  return buffer.toString('base64');
}
