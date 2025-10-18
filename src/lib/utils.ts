import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ensurePx(value: string) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (
    trimmed.endsWith("px") ||
    trimmed.endsWith("%") ||
    trimmed.endsWith("em") ||
    trimmed.endsWith("rem") ||
    trimmed.endsWith("vw") ||
    trimmed.endsWith("vh") ||
    trimmed === "auto"
  ) {
    return trimmed;
  }
  return `${trimmed}px`;
}
