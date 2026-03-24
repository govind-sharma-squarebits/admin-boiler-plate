import type React from "react";
import type { SvgCommonProps } from "@/types";

export const LockIcon: React.FC<SvgCommonProps> = ({
  size = 24,
  fill = "none",
  stroke = "currentcolor",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      id="Lock--Streamline-Lucide"
      height={size}
      width={size}
      {...props}
    >
      <desc>Lock Streamline Icon: https://streamlinehq.com</desc>
      <path
        d="M5 11h14s2 0 2 2v7s0 2 -2 2H5s-2 0 -2 -2v-7s0 -2 2 -2"
        strokeWidth="2"
      />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2" />
    </svg>
  );
};
