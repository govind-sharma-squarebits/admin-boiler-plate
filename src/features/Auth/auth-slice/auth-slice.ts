import type { RootStateReducer } from "@/redux";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
    },
});

export const { setAuthenticated } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const getAuthData = (state: RootStateReducer) => state.auth;
