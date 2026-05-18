import { AppUrls } from "@/constants";

import { AuthLayoutCenterForm } from "./Layout/AuthLayoutCenterForm";
import { ForgotPasswordScreen } from "./screens/ForgotPassword";
import { Login } from "./screens/Login";

export const AuthRoutes = {
  element: <AuthLayoutCenterForm />,
  children: [
    {
      path: AppUrls.LOGIN,
      element: <Login />,
    },
    {
      path: AppUrls.FORGOT_PASSWORD,
      element: <ForgotPasswordScreen />,
    },
  ],
};
