import { API_URL } from "@/constants/api-urls.constants";
import { axiosAuth, axiosInstance } from "@/lib";
import type { RootStateReducer } from "@/redux";
import type { AuthState, LoginInitialValues } from "@/types";
import {
  createAction,
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: AuthState = {
  isAuthenticated: false,
  isAuthLoading: false,
  user: null,
  loginProgress: 0,
  accessToken: "",
  refreshToken: "",
};

export const setLoginProgress = createAction<number>("auth/setLoginProgress");

export const handleSignIn = createAsyncThunk(
  "auth/login",
  async (data: LoginInitialValues, thunkAPI) => {
    const { email, password } = data;
    try {
      const payload: LoginInitialValues = {
        email: email,
        password: password,
      };
      const response = await axiosInstance.post(API_URL.AUTH.LOGIN, payload, {
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total || 1;
          const progress = Math.round((progressEvent.loaded * 100) / total);
          console.log("Login Progress:", progress);
          thunkAPI.dispatch(setLoginProgress(progress));
        },
      });

      console.log("response", response);

      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const handleLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axiosAuth.post(API_URL.AUTH.LOGOUT);
      console.log("response", response);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("response error", error);
        return thunkAPI.rejectWithValue(error.response?.data);
      }
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },

    setIsAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isAuthLoading = action.payload;
      if (action.payload) {
        state.loginProgress = 0;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(setLoginProgress, (state, action) => {
      state.loginProgress = action.payload;
    });

    builder.addCase(handleSignIn.pending, (state) => {
      state.isAuthLoading = true;
    });

    builder.addCase(handleSignIn.fulfilled, (state, action) => {
      state.isAuthLoading = false;
      if (action.payload) {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;

        localStorage.setItem("accessToken", state.accessToken || "");
        localStorage.setItem("refreshToken", state.refreshToken || "");
      }
    });

    builder.addCase(handleSignIn.rejected, (state) => {
      state.isAuthLoading = false;
    });

    builder.addCase(handleLogout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = "";
      state.refreshToken = "";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    });
  },
});

export const { setAuthenticated } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const getAuthData = (state: RootStateReducer) => state.auth;
