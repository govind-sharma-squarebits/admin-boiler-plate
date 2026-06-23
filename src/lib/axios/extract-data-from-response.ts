import type {
  ExtractDataFromResponse,
  ExtractDataFromResponseArg,
} from "@/types";
import { showSuccessToast } from "./instance";

export const extractDataFromResponse = <T>({
  response,
  successCode = [200],
  showToastOnSuccess = false,
}: ExtractDataFromResponseArg<T>): ExtractDataFromResponse<T> => {
  const data = {
    data: response?.data?.data || response?.data || [] || {},
    error: response.data.status === "success" || response.data.success ? false : true,
    code: response?.status,
    meta: response?.data?.meta || {
      total: 0,
      page: 0,
      limit: 0,
    },
  };

  if (showToastOnSuccess) {
    console.log("response", response, showToastOnSuccess);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (response.data?.message) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      showSuccessToast(response.data?.message);
    } else {
      showSuccessToast("Success");
    }
  }

  if (successCode.includes(response.status) && response.data?.success) {
    data.code = response.status;
    return data;
  }

  return data;
};
