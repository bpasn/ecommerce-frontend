import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const wait = (duration: number):Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, duration));
}
export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});