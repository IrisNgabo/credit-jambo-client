import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import savingsReducer from './slices/savingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    savings: savingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
