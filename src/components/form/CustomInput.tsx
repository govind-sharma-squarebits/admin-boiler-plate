"use client";

import React from "react";

import type { BaseInputProps } from "@/types";

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
  ...props
}) => {
  const Component = fieldUseAs as React.ElementType;

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
      <Component
        autoFocus={autoFocus}
        id={name}
        name={name}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-[#F8F8F8] text-[16px] rounded-lg placeholder-[#949494] placeholder:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${className}`}
        onWheel={(
          e: React.WheelEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => e.currentTarget.blur()}
        {...props}
      />
    </div>
  );
};

export default CustomInput;
