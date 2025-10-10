import Draggable from "@/components/block-states/Draggable";
import { Move } from "lucide-react";
import React, { ReactNode, useRef, useState } from "react";

export default function BlockContainer({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  const [hovered, setHovered] = useState(false);
  const handleRef = useRef<HTMLDivElement>(null);

  return (
    // Pass dragHandleRef to Draggable so only the Move div allows dragging
    <Draggable
      id={id}
      className="relative group"
      // Cast to unknown then HTMLElement to satisfy Draggable's RefObject<HTMLElement> requirement
      dragHandleRef={handleRef as React.RefObject<HTMLElement>}
    >
      {children}
      <div
        className="absolute inset-0"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={`absolute inset-0 
            ${hovered ? "bg-blue-500/20 border-2 border-blue-400" : ""} 
            transition-colors pointer-events-none`}
        ></div>
        <div
          ref={handleRef}
          className="absolute -right-4 top-1/2 -translate-y-1/2 bg-blue-400 text-white rounded-full p-1 w-8 h-8 opacity-0 group-hover:opacity-100 cursor-move flex items-center justify-center z-20 select-none"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          // Don't intercept mouse down for move, let Draggable handle it via dragHandleRef
        >
          <Move className="w-full h-full" />
        </div>
      </div>
    </Draggable>
  );
}
