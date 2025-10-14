"use client";
import React, { ReactNode, CSSProperties } from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  children: ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

function Droppable({
  children,
  id = "droppable",
  className,
  style,
}: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const borderStyle = "outline-4 outline-green-500";

  return (
    <div
      ref={setNodeRef}
      id={id}
      className={`${isOver && borderStyle} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default Droppable;
