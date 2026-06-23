import { API_URL } from "@/constants";
import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { detect } from "detect-browser";
import toast from "react-hot-toast";

const browser = detect();

declare global {
  interface Window {
    grecaptcha: {
      reset: () => void;
      execute: (siteKey: string, options: object) => Promise<unknown>;
    };
  }
}

// Axios defaults
axios.defaults.timeout = 60000;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["device-type"] = "WEB";
axios.defaults.headers.common["device-name"] =
  `${browser?.name} ${browser?.version}`;
axios.defaults.headers.common["app-environment"] = import.meta.env
  .VITE_APP_ENVIRONMENT as string;

// Status range constants
const SUCCESS_RANGE = "SUCCESS_RANGE";
const CLIENT_ERROR_RANGE = "CLIENT_ERROR_RANGE";
const SERVER_ERROR_RANGE = "SERVER_ERROR_RANGE";
const UNKNOWN = "UNKNOWN";

const getRange = ({ code }: { code: number }): string => {
  if (code >= 200 && code < 300) return SUCCESS_RANGE;
  if (code >= 400 && code < 500) return CLIENT_ERROR_RANGE;
  if (code >= 500 && code < 600) return SERVER_ERROR_RANGE;
  return UNKNOWN;
};

const handleUnknownError = (): void => {
  console.error("Unknown Error Occurred");
};

/**
 * Show success toast
 */
export const showSuccessToast = (message: string) => {
  toast.success(message);
};

/**
 * Show error toast
 */
export const showErrorToast = (message: string) => {
  console.log("🔥 💻 [ message] ---------- ", message);
  toast.error(message);
};

const handleSuccess = ({
  response,
  showToast = false,
}: {
  response: AxiosResponse;
  showToast?: boolean;
}): void => {
  switch (response.status) {
    case 200:
    case 201:
      if (showToast && response.data.message)
        showSuccessToast(response.data.message);
      break;
    default:
      handleUnknownError();
      break;
  }
};

const handleClientError = ({
  response,
}: {
  response: AxiosResponse;
  showToast?: boolean;
}): void => {
  console.log("🔥 💻 [ response] ---------- ", response);
  if (typeof window !== "undefined" && window?.grecaptcha) {
    window.grecaptcha.reset();
  }

  switch (response.status) {
    case 400:
    case 401: {
      if (response.data.userMessageCode === "UNEXPECTED_ERROR") {
        return;
      }
      break;
    }
    case 403:
    case 404:
    case 405:
    case 406:
    case 407:
    case 408:
    case 409:
    case 410:
      showErrorToast(response.data?.userMessage || response.data?.message);
      break;
    default:
      handleUnknownError();
      break;
  }
};

const handleServerError = ({
  response,
}: {
  response: AxiosResponse;
  showToast?: boolean;
}): void => {
  switch (response.status) {
    case 500:
    case 503:
      break;
    default:
      handleUnknownError();
      break;
  }
};

const handleResponse = ({
  response,
  showToast = false,
}: {
  response: AxiosResponse;
  showToast?: boolean;
}): void => {
  const range = getRange({ code: response?.status });

  switch (range) {
    case SUCCESS_RANGE:
      handleSuccess({ response, showToast });
      break;
    case CLIENT_ERROR_RANGE:
      handleClientError({ response });
      break;
    case SERVER_ERROR_RANGE:
      handleServerError({ response });
      break;
    case UNKNOWN:
      handleUnknownError();
      break;
    default:
      break;
  }
};

// Axios instances
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  responseType: "json",
  withCredentials: true,
});

export const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  responseType: "json",
  withCredentials: true,
});

// Interceptors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    handleResponse({ response });
    return Promise.resolve(response);
  },
  (error) => {
    console.log("🔥 💻 [ error] ---------- ", error);

    if (!error.response) {
      if (axios.isCancel(error)) {
        return Promise.reject(error);
      }
      showErrorToast("Network Error or Request Canceled");
      return Promise.reject(error);
    }

    const response = error.response.data;

    const message = response?.message;

    if (response?.status == "error" || !response?.success) {
      if (message) showErrorToast(message);
    } else {
      handleResponse({ response: error.response });
    }
    return Promise.reject(error);
  },
);

axiosAuth.interceptors.response.use(
  (response: AxiosResponse) => {
    handleResponse({ response });
    return Promise.resolve(response);
  },
  (error) => {
    if (!error.response) {
      if (axios.isCancel(error)) {
        return Promise.reject(error);
      }
      showErrorToast("Network Error or Request Canceled");
      return Promise.reject(error);
    }

    const response = error.response.data;
    console.log("res", response);
    const message = response?.message;

    if (response?.status == "error" || !response?.success) {
      if (message == "jwt expired") return Promise.reject(error);
      if (message) showErrorToast(message);
    } else if (error?.config?.url !== API_URL.AUTH.REFRESH_TOKEN) {
      handleResponse({ response: error.response });
    }
    return Promise.reject(error);
  },
);

// Request Interceptor for Authenticated Axios
axiosAuth.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    try {
      const { store } = await import("@/redux/store");
      const Token = store.getState().auth.accessToken;

      if (Token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${Token}`;
      }
    } catch (e) {
      console.error("Failed to load redux store in interceptor", e);
    }

    return config;
  },
);
