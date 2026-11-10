import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Keep ranges like "7am – 6pm" on one line by joining the dash with non-breaking spaces. */
export function keepTogether(s: string) {
  return s.replace(/ – /g, " – ");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
