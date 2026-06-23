import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE, type WebStorage } from "redux-persist";


import { rootReducer, type RootStateReducer } from "./reducer";
import storageImport from 'redux-persist/lib/storage';
import { createTransform } from "redux-persist";
import type { AuthState } from "@/types";

const storage: WebStorage =
    (storageImport as unknown as { default?: WebStorage }).default ?? storageImport;

const authSubsetTransform = createTransform<AuthState, Omit<AuthState, "accessToken" | "refreshToken">>(
  (inboundState) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accessToken, refreshToken, ...rest } = inboundState;
    return rest;
  },
  (outboundState) => {
    return {
      ...outboundState,
      accessToken: "",
      refreshToken: "",
    };
  },
  { whitelist: ["auth"] }
);

const persistConfig = {
    key: 'admin-boiler-plate-root',
    version: 1,
    storage: storage,
    whitelist: ['auth'],
    transforms: [authSubsetTransform],
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