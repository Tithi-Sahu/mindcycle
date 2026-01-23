import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import habitsReducer from './slices/habitsSlice';
import journalReducer from './slices/journalSlice';
import communityReducer from './slices/communitySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    habits: habitsReducer,
    journal: journalReducer,
    community: communityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Type definitions for TypeScript (if needed)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
