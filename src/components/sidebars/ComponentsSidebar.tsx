"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { blocks } from "@/data/blocks";
import { Code, GripVertical } from "lucide-react";
import Draggable from "../block-states/Draggable";
import { setDraggingBlockId } from "@/store/slices/dragBlockSlice";
import { useAppDispatch } from "@/store/hooks";

export function ComponentsSidebar() {
  const dispatch = useAppDispatch();
  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-sm font-semibold text-sidebar-foreground">
          Components
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Drag and drop to canvas
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 relative">
        {blocks.map((component) => (
          <Draggable
            key={component.id}
            id={component.id}
            onDragStart={() => dispatch(setDraggingBlockId(component.id))}
            onDragEnd={() => dispatch(setDraggingBlockId(null))}
            className="w-full"
          >
            <Card className="p-3 cursor-grab hover:bg-sidebar-accent transition-colors border-sidebar-border group">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-md bg-sidebar-accent flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                  <div className="h-5 w-5">
                    <component.icon />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-medium text-sidebar-foreground">
                      {component.label}
                    </h3>
                    <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {component.description}
                  </p>
                </div>
              </div>
            </Card>
          </Draggable>
        ))}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <Card className="p-3 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-2">
            <Code className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-medium text-foreground">
                Custom HTML
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                Add your own HTML blocks
              </p>
            </div>
          </div>
        </Card>
      </div>
    </aside>
  );
}
