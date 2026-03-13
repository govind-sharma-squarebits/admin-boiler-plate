import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { AppUrls } from "@/constants";
import { getAuthData } from "@/features";
import { useAppSelector } from "@/redux";

/**
 * Higher Order Component (HOC) that adds authentication check to components
 * @param Component - The component to wrap with authentication check
 * @returns A new component that checks authentication before rendering
 */

export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  return function IsAuth(props: P) {
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector(getAuthData).isAuthenticated;

    useEffect(() => {
      if (!isAuthenticated) {
        navigate(AppUrls.LOGIN);
      }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
      return <>loading</>;
    }

    return <Component {...props} />;
  };
};
