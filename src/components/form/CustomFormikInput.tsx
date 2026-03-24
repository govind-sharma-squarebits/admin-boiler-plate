"use client";

import React, { useState } from "react";

import { Field, useField } from "formik";

import { EyeIcon, EyeOffIcon, InfoIcon } from "@/assets";
import { cn } from "@/lib/utils";
import type { FormikInputProps } from "@/types";
import { CustomTooltip } from "../CustomTooltip";
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
  leftIcon,
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
          <label htmlFor={name} className={`font-semibold ${labelColor}`}>
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

      <div
        className={cn(
          "flex items-center w-full text-[16px] rounded-leaf transition-all overflow-hidden",
          disabled && "opacity-50 cursor-not-allowed",
          inputVariants[variant],
          isError && inputVariants["danger"],
          className,
        )}
      >
        {leftIcon && (
          <div className="pl-2 flex items-center justify-center text-gray-500 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <Field
          max={max}
          id={name}
          name={name}
          rows={fieldUseAs === "textarea" ? 3 : undefined}
          as={fieldUseAs}
          type={inputType}
          disabled={disabled}
          placeholder={placeholder}
          className="flex-1 bg-transparent px-3 py-3 placeholder-[#949494] outline-none min-w-0 w-full"
          onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
            e.currentTarget.blur()
          }
          onInput={onInput}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="pr-4 pl-2 text-gray-500 hover:text-gray-700 outline-none cursor-pointer flex items-center justify-center"
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
