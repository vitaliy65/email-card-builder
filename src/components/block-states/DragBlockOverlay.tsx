import { useAppSelector } from "@/store/hooks";
import { DragOverlay } from "@dnd-kit/core";
import React from "react";
import { Item } from "./ItemDrag";

export default function DragBlockOverlay() {
  const activeId = useAppSelector((s) => s.dragBlock.draggingBlockId);
  return (
    <DragOverlay>
      {activeId ? (
        <Item className="bg-white p-2 rounded-xl border border-black text-center">
          {`${activeId.toUpperCase()}`}
        </Item>
      ) : null}
    </DragOverlay>
  );
}
