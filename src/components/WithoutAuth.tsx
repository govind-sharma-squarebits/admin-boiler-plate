import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { AppUrls } from "@/constants";
import { getAuthData } from "@/features";
import { useAppSelector } from "@/redux";

export const withoutAuth = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  return function IsAuth(props: P) {
    const navigate = useNavigate();
    const { isAuthenticated, isSessionChecked } = useAppSelector(getAuthData);

    useEffect(() => {
      if (isSessionChecked && isAuthenticated) {
        navigate(AppUrls.DASHBOARD);
      }
    }, [isAuthenticated, isSessionChecked, navigate]);

    if (!isSessionChecked || isAuthenticated) {
      return <>loading</>;
    }

    return <Component {...props} />;
  };
};
