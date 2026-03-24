import type { InputVariant } from "@/types";

export const inputVariants: Record<InputVariant, string> = {
  primary: "bg-[#F8F8F8] border border-transparent focus-within:ring-2 focus-within:ring-blue-500/20",
  secondary: "bg-gray-100 border border-gray-200 focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-400/20",
  outline: "bg-transparent border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20",
  ghost: "bg-transparent border border-transparent hover:bg-gray-50 focus-within:bg-gray-50 focus-within:ring-2 focus-within:ring-gray-500/10",
  danger: "bg-red-50 border border-red-500 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500",
  success: "bg-green-50 border border-green-500 focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500",
};
