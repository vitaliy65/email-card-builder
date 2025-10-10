"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import DndProvider from "./DndProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <DndProvider>{children}</DndProvider>
    </Provider>
  );
}
