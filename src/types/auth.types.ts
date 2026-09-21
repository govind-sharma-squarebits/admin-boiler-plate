import type { UserType } from "./user.types";

export interface LoginInitialValues {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  isSessionChecked: boolean;
  user: UserType | null;
  loginProgress: number;
  accessToken: string;
}
