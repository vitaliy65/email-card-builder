"use client";
import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import { setDraggingBlockId } from "@/store/slices/dragBlockSlice";
import { useAppDispatch } from "@/store/hooks";
import { Item } from "./ItemDrag";

interface DraggableProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

function Draggable({ id = "draggable", children, className }: DraggableProps) {
  const dispatch = useAppDispatch();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id,
  });

  // Устанавливаем draggingBlockId в redux при начале и окончании drag
  React.useEffect(() => {
    if (isDragging) {
      dispatch(setDraggingBlockId(id));
    } else {
      dispatch(setDraggingBlockId(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, id, dispatch]);

  return (
    <Item ref={setNodeRef} {...listeners} {...attributes} className={className}>
      {children}
    </Item>
  );
}

export default Draggable;
