import Env from "@/config/Env";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// generateRandomNumber
export function generateRandomNumber(): number {
  const min = 200;
  const max = 2000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// byteToMb

export function byteToMb(bytes: number): number {
  const mb = 1048576;
  return bytes / mb;
}

export function getImageUrl(image: string): string {
  return `${Env.SUPABASE_URL}/storage/v1/object/public/${Env.S3_BUCKET}/${image}`;
}

export function capitializeFirst(data: string): string {
  return `${data.charAt(0).toUpperCase()}${data.slice(1)}`;
}