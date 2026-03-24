"use client";

import React, { useState } from "react";

import { Field, useField } from "formik";

import { InfoIcon, EyeIcon, EyeOffIcon } from "@/assets";
import type { FormikInputProps } from "@/types";
import { CustomTooltip } from "../CustomTooltip";
import { cn } from "@/lib/utils";
import { inputVariants } from "./input.constants";

export const CustomFormikInput: React.FC<FormikInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  disabled = false,
  className = "",
  errorShow,
  isMandatory,
  fieldUseAs = "input",
  labelColor = "text-black",
  max,
  helpText,
  tooltipPosition = "bottom",
  variant = "primary",
  onInput,
  ...props
}) => {
  const [, meta] = useField(name);
  const isError = errorShow || (meta.touched && meta.error);
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="relative w-full">
      {label && (
        <div className="flex items-center gap-2 w-full mb-1">
          <label htmlFor={name} className={`font-bold ${labelColor}`}>
            {label}
            {isMandatory && <span className="text-red-500 ml-1">*</span>}
          </label>
          {!!helpText && (
            <>
              <CustomTooltip content={helpText} position={tooltipPosition}>
                <InfoIcon size={16} />
              </CustomTooltip>
            </>
          )}
        </div>
      )}

      <div className="relative w-full">
        <Field
          max={max}
          id={name}
          name={name}
          rows={fieldUseAs === "textarea" ? 3 : undefined}
          as={fieldUseAs}
          type={inputType}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "w-full px-4 py-3 text-[16px] rounded-leaf placeholder-[#949494] placeholder:text-sm outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed",
          type === "password" && "pr-12",
          inputVariants[variant],
          isError && inputVariants["danger"],
          className,
        )}
        onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
          e.currentTarget.blur()
        }
        onInput={onInput}
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
    {isError && (
        <div className="text-red-500 text-[12px] absolute -bottom-5 left-2">
          {meta.error}
        </div>
      )}
    </div>
  );
};
