import type { ParseApiErrorResponse } from "@/types";
import { showErrorToast } from "./instance";

export const parseApiErrorResponse: ParseApiErrorResponse = ({
  error,
  showToast,
}) => {
  if (error) {
    const statusCode = error.response?.data?.data?.status;

    if (
      showToast &&
      error?.message !== "canceled" &&
      error?.code !== "ECONNABORTED"
    ) {
      showErrorToast(error?.response?.data?.data?.userMessage || "");
    }

    if (statusCode === 503) {
      throw error.response?.data;
    }

    return {
      data: error.response?.data,
      error: true,
      code: statusCode,
    };
  }

  return { error: true };
};
