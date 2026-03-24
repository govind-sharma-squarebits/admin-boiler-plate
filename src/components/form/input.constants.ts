import type { InputVariant } from "@/types";

export const inputVariants: Record<InputVariant, string> = {
  primary: "bg-[#F8F8F8] border-transparent focus:ring-blue-500/20",
  secondary: "bg-gray-100 border-gray-200 focus:border-gray-400 focus:ring-gray-400/20",
  outline: "bg-transparent border border-gray-300 focus:border-blue-500 focus:ring-blue-500/20",
  ghost: "bg-transparent border-transparent hover:bg-gray-50 focus:bg-gray-50 focus:ring-gray-500/10",
  danger: "bg-red-50 border border-red-500 focus:ring-red-500/20 focus:border-red-500",
  success: "bg-green-50 border border-green-500 focus:ring-green-500/20 focus:border-green-500",
};
