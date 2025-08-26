// src/components/ui/card.tsx
import { cn } from "@/lib/utils";
import React from "react";

export function Card({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow border border-gray-200 overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardContent({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4", className)}>{children}</div>
  );
}
