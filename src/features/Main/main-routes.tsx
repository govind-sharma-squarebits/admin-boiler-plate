import { AppUrls } from "@/constants";
import { MainLayout } from "./Layout/MainLayout";

export const MainRoutes = {
  element: <MainLayout isSideBarLayout />,
  children: [
    {
      path: AppUrls.DASHBOARD,
      element: <>Dashboard</>,
    },
  ],
};
