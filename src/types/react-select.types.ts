import type { Props } from "react-select";

export type OptionType = {
  [key: string]: string | number | boolean | string[];
};

export type Option = {
  label: string;
  value: string | number;
};

// export interface CustomFormikReactSelectProps extends Props<OptionType> {
//   label: string;
//   name: string;
//   options: OptionType[];
//   placeholder?: string;
//   isMulti?: boolean;
//   valueKey?: keyof OptionType;
//   labelKey?: keyof OptionType;
//   disabled?: boolean;
//   setOpen?: (open: boolean) => void;
//   onCustomChange?: (value: OptionType) => void;
//   isNullValue?: boolean;
//   isSearchable?: boolean;
// }

export interface CustomFormikReactSelectProps<T extends OptionType = OptionType>
  extends Props<T> {
  label: string;
  name: string;
  options: T[];
  placeholder?: string;
  isMulti?: boolean;
  valueKey?: keyof T;
  labelKey?: keyof T;
  disabled?: boolean;
  setOpen?: (open: boolean) => void;
  onCustomChange?: (value: T | null) => void;
  isNullValue?: boolean;
  isSearchable?: boolean;
}

export interface CustomFormikAsyncSelectProps<T extends OptionType = OptionType>
  extends Omit<Props<T>, "options"> {
  label: string;
  name: string;
  loadOptions: (
    inputValue: string,
    callback: (options: T[]) => void,
  ) => Promise<T[]> | void;
  defaultOptions?: T[] | boolean;
  placeholder?: string;
  isMulti?: boolean;
  valueKey?: keyof T;
  labelKey?: keyof T;
  disabled?: boolean;
  onCustomChange?: (value: T | null) => void;
  isNullValue?: boolean;
  isSearchable?: boolean;
  cacheOptions?: boolean;
}
