import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import blocksReducer from "./slices/blocksSlice";
import dragBlockReducer from "./slices/dragBlockSlice";

const rootReducer = combineReducers({
  blocks: blocksReducer,
  dragBlock: dragBlockReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["dragBlock"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
