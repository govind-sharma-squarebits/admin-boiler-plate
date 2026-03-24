// components/CustomButton.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "danger" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: Variant;
  size?: Size;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

const buttonVariants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary/20",
  secondary:
    "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-200/50",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/20",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-100",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-gray-100 focus:ring-gray-400/20",
};

const sizeVariants: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export const CustomButton: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  leftIcon,
  rightIcon,
  disabled,
  isLoading = false,
  ...props
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center gap-2 justify-center font-medium rounded-lg transition-all duration-200 outline-none focus:ring-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        buttonVariants[variant],
        sizeVariants[size],
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-current inline-flex"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        children
      )}
      {!isLoading && leftIcon && (
        <span className="inline-flex py-0.5 px-0.5">{leftIcon}</span>
      )}

      {!isLoading && rightIcon && (
        <span className="inline-flex">{rightIcon}</span>
      )}
    </button>
  );
};
