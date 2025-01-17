// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import localeReducer from "./localeSlice";

const store = configureStore({
  reducer: {
    locale: localeReducer, // Register the locale slice here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
