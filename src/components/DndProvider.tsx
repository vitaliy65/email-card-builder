"use client";
import React, { ReactNode } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import DragBlockOverlay from "./block-states/DragBlockOverlay";
import { addBlock } from "@/store/slices/blocksSlice";
import { CanvasBlock } from "@/store/slices/blocksSlice";
import { blocks } from "@/data/blocks"; // Импортируйте blocks напрямую

export default function DndProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const canvasBlockCount = useAppSelector((s) => s.blocks.canvasBlocks);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Найти блок по ID в доступных блоках
    const draggedBlock = blocks.find((block) => block.id === active.id);

    if (draggedBlock && over.id.toString().startsWith("droppable-block-")) {
      // Создать новый экземпляр блока для canvas
      const newCanvasBlock: CanvasBlock = {
        ...draggedBlock,
        uuid: `${draggedBlock.id}-${Date.now()}`, // уникальный ID
        properties: {
          backgroundColor: "#ffffff",
          padding: "12px",
          margin: "0",
          // Добавляем контент по умолчанию в зависимости от типа блока
          content:
            draggedBlock.type === "text"
              ? "Double-click to edit this text"
              : draggedBlock.type === "heading"
              ? "Double-click to edit this heading"
              : draggedBlock.type === "button"
              ? "Click Me"
              : "",
          src:
            draggedBlock.type === "image"
              ? "https://placehold.co/400x200/png?text=Image"
              : undefined,
          alt: draggedBlock.type === "image" ? "Image" : undefined,
        },
      };

      dispatch(
        addBlock({ block: newCanvasBlock, index: canvasBlockCount.length + 1 })
      );
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {children}
      <DragBlockOverlay />
    </DndContext>
  );
}
