import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const backendUrl = 'https://wellness-backend-08mq.onrender.com' || 'http://localhost:100'
