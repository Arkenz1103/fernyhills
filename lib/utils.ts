import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Keep time ranges like "7am to 6pm" on one line by joining them with non-breaking spaces. */
export function keepTogether(s: string) {
  return s.replace(/(\d+(?:am|pm)) (to|–) (\d+(?:am|pm))/gi, "$1\u00a0$2\u00a0$3");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
