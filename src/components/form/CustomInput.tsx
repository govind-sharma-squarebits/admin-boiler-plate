"use client";

import React, { useState } from "react";

import type { BaseInputProps } from "@/types";
import { EyeIcon, EyeOffIcon } from "@/assets";
import { cn } from "@/lib/utils";
import { inputVariants } from "./input.constants";

const CustomInput: React.FC<BaseInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  disabled = false,
  className = "",
  isMandatory,
  autoFocus = false,
  labelColor = "text-black",
  fieldUseAs = "input",
  variant = "primary",
  ...props
}) => {
  const Component = fieldUseAs as React.ElementType;
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={name}
          className={`font-bold ${labelColor} flex items-center gap-1 mb-1`}
        >
          {label}
          {isMandatory && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative w-full">
        <Component
          autoFocus={autoFocus}
          id={name}
          name={name}
          type={inputType}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "w-full px-4 py-3 text-[16px] rounded-tl-[10px] rounded-br-[10px] placeholder-[#949494] placeholder:text-sm outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed",
            type === "password" && "pr-12",
            inputVariants[variant],
            className,
          )}
          onWheel={(
            e: React.WheelEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => e.currentTarget.blur()}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 outline-none cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
