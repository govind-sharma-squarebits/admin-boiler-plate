"use client";

import React from "react";
import { useField, useFormikContext } from "formik";

import Select, {
  type DropdownIndicatorProps,
  type IndicatorSeparatorProps,
  type MultiValue,
  type PlaceholderProps,
  components,
} from "react-select";
import type { CustomFormikReactSelectProps, OptionType } from "../../types";
import { customStyles } from "@/assets/style/react-select.styles";

const IndicatorSeparator = ({ innerProps }: IndicatorSeparatorProps) => {
  return <span {...innerProps} />;
};

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}></components.DropdownIndicator>
  );
};
const Placeholder = (props: PlaceholderProps) => {
  return <components.Placeholder {...props} />;
};

export function CustomFormikReactSelect<T extends OptionType>({
  label,
  name,
  options,
  valueKey = "value",
  labelKey = "label",
  placeholder = "Select...",
  disabled,
  setOpen,
  isSearchable = true,
  isMulti = false,
  isNullValue = false,
  ...props
}: CustomFormikReactSelectProps<T>) {
  const [field, meta, helper] = useField(name);
  const { setFieldValue } = useFormikContext();

  const selectedOption = isMulti
    ? options?.filter((opt) => field.value?.includes(opt.value))
    : options?.find((opt) => opt.value === field.value);

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={name}
          className="font-semibold text-[#333333] text-[14px] block mb-2"
        >
          {label}
        </label>
      )}

      <Select<T, boolean>
        instanceId={name}
        inputId={name}
        name={name}
        isDisabled={disabled}
        options={options}
        placeholder={placeholder}
        isMulti={isMulti as boolean}
        isSearchable={isSearchable}
        value={selectedOption || null}
        onChange={(option: T | MultiValue<T> | null) => {
          if (props.onCustomChange) {
            // If customOnChange is provided, call it and skip Formik updates
            props.onCustomChange(option as T);
            return;
          }

          // Otherwise, run default Formik logic
          if (isMulti) {
            setFieldValue(
              name,
              option
                ? (option as MultiValue<OptionType>).map(
                    (item: OptionType) => item.value,
                  )
                : [],
            );
          } else {
            const selectedValue = option ? (option as T)[valueKey] : null;
            helper.setValue(selectedValue);

            if (selectedValue === "Hotel Required") {
              setOpen?.(true);
            } else {
              setOpen?.(false);
            }
          }
        }}
        className="basic-single"
        classNamePrefix="select"
        getOptionValue={(option: T) => option[valueKey as keyof T] as string}
        getOptionLabel={(option: T) => option[labelKey as keyof T] as string}
        components={{
          IndicatorSeparator: IndicatorSeparator as React.ComponentType<
            IndicatorSeparatorProps<T, boolean>
          >,
          DropdownIndicator: DropdownIndicator as React.ComponentType<
            DropdownIndicatorProps<T, boolean>
          >,
          Placeholder: Placeholder as React.ComponentType<
            PlaceholderProps<T, boolean>
          >,
        }}
        styles={customStyles<T>({ maxHeight: "130px" })}
        isClearable
        {...props}
      />

      {(isNullValue ? field.value == null : true) &&
      meta.touched &&
      meta.error ? (
        <p className="text-[#d32f2f] text-[12px] absolute left-2 -bottom-5">
          {meta.error}
        </p>
      ) : null}
    </div>
  );
}
