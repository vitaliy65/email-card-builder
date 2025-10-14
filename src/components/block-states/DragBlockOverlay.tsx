"use client";
import { useAppSelector } from "@/store/hooks";
import { DragOverlay } from "@dnd-kit/core";
import React from "react";
import { Item } from "./ItemDrag";
import { Card } from "../ui/card";
import { GripVertical } from "lucide-react";
import { blockPreviews } from "@/data/blocksPreview";

export default function DragBlockOverlay() {
  const activeId = useAppSelector((s) => s.dragBlock.draggingBlockId);

  // Find the active component info directly
  const componentInfo = blockPreviews.find((block) => block.id === activeId);

  if (!componentInfo) return null;

  return (
    <DragOverlay>
      {activeId ? (
        <Item id={activeId}>
          <Card className="p-3 cursor-grab hover:bg-sidebar-accent transition-colors border-sidebar-border group">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-md bg-sidebar-accent flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                <div className="h-5 w-5">
                  <componentInfo.icon />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-medium text-sidebar-foreground">
                    {componentInfo.label}
                  </h3>
                  <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {componentInfo.description}
                </p>
              </div>
            </div>
          </Card>
        </Item>
      ) : null}
    </DragOverlay>
  );
}
