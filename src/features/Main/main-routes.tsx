import { UnderDevelopment } from "@/components";
import { AppUrls } from "@/constants";
import { Navigate } from "react-router-dom";
import { MainLayout } from "./Layout/MainLayout";

export const MainRoutes = {
  element: <MainLayout isSideBarLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={AppUrls.DASHBOARD} replace />,
    },
    {
      path: AppUrls.DASHBOARD,
      element: <UnderDevelopment/>,
    },
  ],
};
