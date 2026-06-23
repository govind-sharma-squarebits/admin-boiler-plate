import { isAxiosError } from "axios";

import { API_URL } from "@/constants";
import { logout, setTokensInRedux } from "@/features";
import type { CallAPIArg, RefreshTokenData, ExtractDataFromResponse, ParseApiErrorResponseResult } from "@/types";
import { extractDataFromResponse } from "./extract-data-from-response";
import { axiosAuth } from "./instance";
import { parseApiErrorResponse } from "./parse-api-error-response";

let refreshTokenPromise: Promise<{ data: RefreshTokenData } | { error: true }> | null = null;

export const getStore = async () => {
  const { store } = await import("@/redux/store");
  return store;
};

export const refreshTokenRequest = async (): Promise<{ data: RefreshTokenData } | { error: true }> => {
  const authErrorCode = 401;
  try {
    const response = await axiosAuth.post<{ data: RefreshTokenData }>(
      API_URL.AUTH.REFRESH_TOKEN
    );
    return extractDataFromResponse<RefreshTokenData>({
      response,
      showToastOnSuccess: false,
    }) as { data: RefreshTokenData } | { error: true };
  } catch (error) {
    if (isAxiosError(error)) {
      if (
        error.response?.status === authErrorCode ||
        error.response?.data?.statusCode === authErrorCode
      ) {
        const store = await getStore();
        store.dispatch(logout());

        return { error: true };
      }

      return parseApiErrorResponse({
        error,
        showToast: false,
      }) as { error: true };
    } else {
      return { error: true };
    }
  }
};

export const callApiFn = async <T>({
  apiRequest,
  successCode = [200],
  showToastOnSuccess = true,
  showToastOnError = true,
  authErrorCode = 401,
}: CallAPIArg<T>): Promise<ExtractDataFromResponse<T> | ParseApiErrorResponseResult> => {
  if (apiRequest) {
    try {
      const response = await apiRequest(axiosAuth);

      return extractDataFromResponse<T>({
        response,
        successCode,
        showToastOnSuccess,
      });
    } catch (error) {
      console.log("call api error", error, isAxiosError(error));

      if (isAxiosError(error)) {
        if (
          error.response?.status === authErrorCode ||
          error.response?.data?.statusCode === authErrorCode
        ) {
          if (!refreshTokenPromise) {
            refreshTokenPromise = refreshTokenRequest();
          }

          try {
            // Await the shared refresh token promise to deduplicate requests
            const refreshResponse = await refreshTokenPromise;
            refreshTokenPromise = null;
            if (refreshResponse) {
              // Save the new tokens
              const store = await getStore();

              if ("data" in refreshResponse) {
                const { accessToken } = refreshResponse.data;

                store.dispatch(
                  setTokensInRedux({
                    accessToken,
                  })
                );
              }

              // Retry the original API request with the new token
              const retryResponse = await apiRequest(axiosAuth);
              return extractDataFromResponse<T>({
                response: retryResponse,
                successCode,
                showToastOnSuccess,
              });
            }
          } catch (refreshError) {
            console.log("refresh token error", refreshError);
            refreshTokenPromise = null;
            // Handle token refresh failure
            const store = await getStore();
            store.dispatch(logout());
            return { error: true } as ParseApiErrorResponseResult;
          }
        }

        return parseApiErrorResponse({
          error,
          showToast: showToastOnError,
        });
      } else {
        return { error: true } as ParseApiErrorResponseResult;
      }
    }
  }

  return { error: true } as ParseApiErrorResponseResult;
};
