import { combineReducers } from "@reduxjs/toolkit";

import { authReducer } from "@/features/Auth/auth-slice/auth-slice";

export const rootReducer = combineReducers({
    auth: authReducer
})

export type RootStateReducer = ReturnType<typeof rootReducer>