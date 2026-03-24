"use client";

import { useState, type ReactNode } from "react";

interface CustomTooltipProps {
  content: string | ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export const CustomTooltip = ({
  content,
  children,
  position = "top",
}: CustomTooltipProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const positionClasses: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-50 px-3 py-1 text-sm text-black rounded shadow bg-white min-w-40 md:min-w-70  ${positionClasses[position]}`}
        >
          <span>{content}</span>
        </div>
      )}
    </div>
  );
};
