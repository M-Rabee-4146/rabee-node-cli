import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // Use sessionStorage instead of localStorage

import authReducer from "../features/auth.jsx";

// 1. Configuration for redux-persist
const persistConfig = {
  key: 'new-pos-key', // The key for the localStorage object
  version: 1,  // Version of your persisted state
  storage,     // The storage medium (localStorage)
};

// 2. Combine your reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// 3. Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure your store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 200,
      },
      immutableCheck: {
        warnAfter: 200,
      },
    }),
});

export const persistor = persistStore(store);
