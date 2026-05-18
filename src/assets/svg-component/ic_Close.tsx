import type { SvgCommonProps } from "@/types";

export const CloseIcon = ({
  size = 24,
  stroke = "black",
  ...props
}: SvgCommonProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      height={size}
      width={size}
      {...props}
    >
      <path d="M18 6 6 18" strokeWidth="2"></path>
      <path d="m6 6 12 12" strokeWidth="2"></path>
    </svg>
  );
};
