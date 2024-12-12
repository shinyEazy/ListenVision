import { configureStore } from "@reduxjs/toolkit";
import isDemandedReducer from './slices/isDemandedSlice'

export const store = configureStore({
  reducer: {
    isDemanded: isDemandedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
