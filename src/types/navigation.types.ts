import type React from "react";

import type { SvgCommonProps } from "./svg.types";

export interface NavigationChild {
  label: string;
  path: string;
}

export interface NavigationItem {
  label: string;
  path: string;
  icon?: React.FC<SvgCommonProps>;
  children?: NavigationChild[];
}
