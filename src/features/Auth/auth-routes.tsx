import { AppUrls } from "@/constants";

import { AuthLayoutSideForm } from "./Layout/AuthLayoutSideForm";
import { ForgotPasswordScreen } from "./screens/ForgotPassword";
import { Login } from "./screens/Login";

export const AuthRoutes = {
  element: <AuthLayoutSideForm />,
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
