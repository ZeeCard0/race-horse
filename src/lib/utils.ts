import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: Parameters<typeof cx>) => twMerge(cx(inputs));

const cleanNames = (names: string[]) =>
  names.filter((name) => !!name).map((name) => name.trim());

export { cn, cleanNames };
