import type { InputHTMLAttributes, ReactNode } from "react";


export type InputVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";

export interface BaseInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
    name?: string;
    label?: ReactNode;
    isMandatory?: boolean;
    errorShow?: boolean;
    labelColor?: string;
    helpText?: string;
    tooltipPosition?: "top" | "bottom" | "left" | "right";
    fieldUseAs?: "input" | "textarea";
    variant?: InputVariant;
    leftIcon?: ReactNode;
}

export interface FormikInputProps extends BaseInputProps {
    name: string;
}
