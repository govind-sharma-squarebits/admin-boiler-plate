import { useEffect, type ReactNode } from "react";

import { CenteredBox } from "@/components/CenterBox";
import {
  getAuthData,
  logout,
  setAuthenticated,
  setSessionChecked,
  setTokensInRedux,
} from "@/features";
import { ensureRefreshToken } from "@/lib/axios/call-api";
import { useAppDispatch, useAppSelector } from "@/redux";

export const SessionBootstrap = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const isSessionChecked = useAppSelector(getAuthData).isSessionChecked;

  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      const result = await ensureRefreshToken();
      if (cancelled) return;

      const accessToken =
        "data" in result &&
        result.data &&
        typeof result.data === "object" &&
        "accessToken" in result.data
          ? result.data.accessToken
          : undefined;

      if (accessToken) {
        dispatch(setTokensInRedux({ accessToken }));
        dispatch(setAuthenticated(true));
      } else {
        dispatch(logout());
      }

      dispatch(setSessionChecked(true));
    };

    void restoreSession();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  if (!isSessionChecked) {
    return <CenteredBox className="h-dvh">loading</CenteredBox>;
  }

  return children;
};
