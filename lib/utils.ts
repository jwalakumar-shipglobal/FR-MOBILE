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


export function formatDocumentValue(value: string): string {
  if (!value) return "Not Provided";

  const length = value.length;
  const obscuredLength = Math.max(length - 4, 0);

  const obscuredPart = "X"
    .repeat(obscuredLength)
    .replace(/(.{4})/g, "$1-")
    .slice(0, -1);

  return obscuredPart + "-" + value.slice(-4);
}