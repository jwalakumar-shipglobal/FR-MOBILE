import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSentenceCase(str: any): string {
  if (!str) return "";

  const text = String(str).toLowerCase();

  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function boolToNumber(value: boolean) {
  if (value === true) {
    return "1";
  } else if (value === false) {
    return "0";
  } else {
    return null;
  }
}
