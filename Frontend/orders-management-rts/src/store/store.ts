import { configureStore } from "@reduxjs/toolkit";
import configurationsReducer from "./configurationsSlice";

export const store = configureStore({
  reducer: {
    configurations: configurationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
