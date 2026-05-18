import type { NavigationItem } from "../types";
import { AppUrls } from "./app-urls.constants";

const DASHBOARD = "Dashboard";
const LOGOUT = "Logout";

export const navigation: NavigationItem[] = [
  {
    label: DASHBOARD,
    // icon: DashboardIcon,
    path: AppUrls.DASHBOARD,
  },
];

export const logoutNavItem: NavigationItem = {
  label: LOGOUT,
  // icon: LogoutIcon,
  path: AppUrls.LOGIN,
};
