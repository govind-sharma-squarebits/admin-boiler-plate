import type { SVGProps } from "react";

export interface SvgCommonProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
  fill?: string;
  stroke?: string;
  strokeWidth?: string | number;
  strokeOpacity?: string;
  width?: string | number;
  height?: string | number;
}
