// src/components/ui/button.tsx
import { cn } from "@/lib/utils";
import React from "react";

export function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
