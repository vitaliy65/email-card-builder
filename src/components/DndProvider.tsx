"use client";
import React, { ReactNode } from "react";
import { DndContext } from "@dnd-kit/core";
import DragBlockOverlay from "./block-states/DragBlockOverlay";
import { useDragAndDrop } from "@/hooks";

export default function DndProvider({ children }: { children: ReactNode }) {
  const { handleDragEnd } = useDragAndDrop();

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {children}
      <DragBlockOverlay />
    </DndContext>
  );
}
