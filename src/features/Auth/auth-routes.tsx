import { AppUrls } from "@/constants";

import { AuthLayoutCenterForm } from "./Layout/AuthLayoutCenterForm";
import { Login } from "./screens/Login";

export const AuthRoutes = {
  element: <AuthLayoutCenterForm />,
  children: [
    {
      path: AppUrls.LOGIN,
      element: <Login />,
    },
  ],
};
