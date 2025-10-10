"use client";
import React, { ReactNode, RefObject } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Item } from "./ItemDrag";

interface DraggableProps {
  id?: string;
  children: ReactNode;
  className?: string;
  dragHandleRef?: RefObject<HTMLElement>;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

function Draggable({
  id = "draggable",
  children,
  className,
  dragHandleRef,
  onDragStart,
  onDragEnd,
}: DraggableProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id,
  });

  // Следим за началом и концом перетаскивания через isDragging
  const wasDragging = React.useRef(false);
  React.useEffect(() => {
    if (isDragging && !wasDragging.current) {
      onDragStart?.();
      wasDragging.current = true;
    }
    if (!isDragging && wasDragging.current) {
      onDragEnd?.();
      wasDragging.current = false;
    }
  }, [isDragging, onDragStart, onDragEnd]);

  // Если есть handleRef, "слушаем" начало только с handle
  const patchedListeners = dragHandleRef?.current
    ? {
        onPointerDown: (e: React.PointerEvent) => {
          if (
            dragHandleRef.current &&
            dragHandleRef.current.contains(e.target as Node) &&
            !!listeners?.onPointerDown
          ) {
            listeners?.onPointerDown?.(e);
          }
        },
      }
    : listeners;

  return (
    <Item
      ref={setNodeRef}
      {...attributes}
      {...patchedListeners}
      className={className}
    >
      {children}
    </Item>
  );
}

export default Draggable;
