import { AppUrls } from "@/constants";

import { AuthLayoutCenterForm } from "./Layout/AuthLayoutCenterForm";

export const AuthRoutes = {
  element: <AuthLayoutCenterForm />,
  children: [
    {
      path: AppUrls.LOGIN,
      element: <div>Login </div>,
    },
  ],
};
