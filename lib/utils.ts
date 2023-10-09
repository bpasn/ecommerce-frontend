import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function wait(duration: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, duration));
}
