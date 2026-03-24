"use client";

import React from "react";

import { Field, useField } from "formik";

import { InfoIcon } from "@/assets";
import type { FormikInputProps } from "@/types";
import { CustomTooltip } from "../CustomTooltip";

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
  onInput,
  ...props
}) => {
  const [, meta] = useField(name);
  const isError = errorShow || (meta.touched && meta.error);

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

      <Field
        max={max}
        id={name}
        name={name}
        rows={fieldUseAs === "textarea" ? 3 : undefined}
        as={fieldUseAs}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-[#F8F8F8] text-[16px] rounded-lg placeholder-[#949494] placeholder:text-sm outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
          isError
            ? "border border-red-500 focus:ring-2 focus:ring-red-500/20"
            : "border border-transparent focus:ring-2 focus:ring-blue-500/20"
        } ${className}`}
        onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
          e.currentTarget.blur()
        }
        onInput={onInput}
        {...props}
      />
      {isError && (
        <div className="text-red-500 text-[12px] absolute -bottom-5 left-2">
          {meta.error}
        </div>
      )}
    </div>
  );
};
