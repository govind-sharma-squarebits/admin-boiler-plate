import type { AxiosInstance, AxiosResponse, AxiosError } from "axios";

export interface RefreshTokenData {
  accessToken: string;
  refreshToken?: string;
}

export interface ApiResponseWrapper<T> {
  status?: string;
  success?: boolean;
  data?: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
  message?: string;
}

export interface ExtractDataFromResponse<T> {
  data: T | ApiResponseWrapper<T> | never[] | Record<string, never>;
  error: boolean;
  code: number;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface ExtractDataFromResponseArg<T = Record<string, never>> {
  response: AxiosResponse<ApiResponseWrapper<T>>;
  successCode?: number[];
  showToastOnSuccess?: boolean;
}

export interface ApiErrorResponseData {
  statusCode?: number;
  status?: number;
  message?: string;
  data?: {
    status?: number;
    userMessage?: string;
  };
}

export interface ParseApiErrorResponseArg {
  error: AxiosError<ApiErrorResponseData>;
  showToast?: boolean;
}

export interface ParseApiErrorResponseResult {
  data?: ApiErrorResponseData;
  error: true;
  code?: number;
}

export type ParseApiErrorResponse = (
  arg: ParseApiErrorResponseArg
) => ParseApiErrorResponseResult;

export interface CallAPIArg<T = Record<string, never>> {
  apiRequest: (axios: AxiosInstance) => Promise<AxiosResponse<ApiResponseWrapper<T>>>;
  successCode?: number[];
  showToastOnSuccess?: boolean;
  showToastOnError?: boolean;
  authErrorCode?: number;
}
