"use client";
import React, { ReactNode, RefObject } from "react";
import { useDraggable } from "@dnd-kit/core";
import { setDraggingBlockId } from "@/store/slices/dragBlockSlice";
import { useAppDispatch } from "@/store/hooks";
import { Item } from "./ItemDrag";

interface DraggableProps {
  id?: string;
  children: ReactNode;
  className?: string;
  dragHandleRef?: RefObject<HTMLElement>;
}

function Draggable({
  id = "draggable",
  children,
  className,
  dragHandleRef,
}: DraggableProps) {
  const dispatch = useAppDispatch();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id,
  });

  // Track dragging block in redux
  React.useEffect(() => {
    if (isDragging) {
      dispatch(setDraggingBlockId(id));
    } else {
      dispatch(setDraggingBlockId(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, id, dispatch]);

  // If dragHandleRef provided, initiate drag only from handle, NOT whole block
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
