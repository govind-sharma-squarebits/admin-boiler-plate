import type { StylesConfig } from "react-select";

import type { Option, OptionType } from "../../types";

export const customSelectStyles: StylesConfig<Option, false> = {
  control: (base) => ({
    ...base,
    borderTopLeftRadius: "0.5rem",
    borderBottomLeftRadius: "0.5rem",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "#FDAF08",
    color: "#ffffff",
    height: "48px",
    minWidth: "100px",
    border: "none",
    boxShadow: "none",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#fff",
    paddingRight: "6px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 20,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#FDAF08"
      : state.isFocused
        ? "#FDAF084D"
        : "white",
    color: state.isSelected || state.isFocused ? "#fff" : "#949494",
    padding: "8px 14px",
    cursor: "pointer",
    fontWeight: "500",
  }),
};

export const customStyles = <T extends OptionType>({
  maxHeight = "130px",
}: {
  maxHeight?: string;
}): StylesConfig<T, boolean> => ({
  control: (provided) => ({
    ...provided,
    outline: "none",
    boxShadow: "none",
    flexWrap: "nowrap",
    ":hover": {
      boxShadow: "none",
    },
    backgroundColor: "#ffffff",
    padding: "6px 4px",
    borderRadius: "0.5rem",
    borderColor: "#e1e1e1 !important",
    fontSize: "0.875rem",
    border: "1px solid",
    color: "#000000",
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "transparent", // Dark background for options
    borderRadius: "8px",
    overflow: "hidden",
    zIndex: 1000,
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0, // Remove extra padding
    maxHeight: maxHeight,
    borderRadius: "6px",
    overflow: "auto",
    backgroundColor: "#FFFFFF", // Match the control background

    // border: `1px solid ${theme.palette.text.secondary}`,
  }),
  option: (provided, state) => ({
    ...provided,
    // border: `1px solid ${theme.palette.text.secondary}`,
    // borderRadius: "6px",
    backgroundColor: state.isSelected
      ? "#FDAF08" // Purple background when selected
      : state.isFocused
        ? "#90a2d7" // Gray background when hovered
        : "white", // Transparent by default
    color: state.isSelected || state.isFocused ? "#fff" : "#646464", // Adjust text colors
    padding: "8px 14px", // Adjust padding
    cursor: "pointer",
    fontWeight: "500",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#000000", // Text color inside control
    fontWeight: "500",
  }),
  input: (base) => ({
    ...base,
    color: "#000000", // Text color inside input
    fontSize: "16px",

    // fontWeight: 500,
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: "1em",
    color: "#949494",
    // fontWeight: 500,
  }),
});
