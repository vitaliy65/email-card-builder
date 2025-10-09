"use client";
import React, { ReactNode } from "react";
import { DndContext } from "@dnd-kit/core";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import DragBlockOverlay from "./block-states/DragBlockOverlay";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <DndContext>
      <Provider store={store}>
        {children}
        <DragBlockOverlay />
      </Provider>
    </DndContext>
  );
}
