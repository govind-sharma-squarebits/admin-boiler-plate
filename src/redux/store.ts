import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE, type WebStorage } from "redux-persist";


import { rootReducer, type RootStateReducer } from "./reducer";
import storageImport from 'redux-persist/lib/storage';
import { createTransform } from "redux-persist";
import type { AuthState } from "@/types";

const storage: WebStorage =
    (storageImport as unknown as { default?: WebStorage }).default ?? storageImport;

type PersistedAuthState = Pick<AuthState, "user">;

const authSubsetTransform = createTransform<AuthState, PersistedAuthState>(
  (inboundState) => ({
    user: inboundState.user,
  }),
  (outboundState) => ({
    user: outboundState.user ?? null,
    isAuthenticated: false,
    isAuthLoading: false,
    isSessionChecked: false,
    accessToken: "",
    loginProgress: 0,
  }),
  { whitelist: ["auth"] }
);

const persistConfig = {
    key: 'admin-boiler-plate-root',
    version: 2,
    storage: storage,
    whitelist: ['auth'],
    transforms: [authSubsetTransform],
    migrate: () => Promise.resolve(undefined),
};

const persistedReducer = persistReducer<RootStateReducer>(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: import.meta.env.MODE !== 'production',

})

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;