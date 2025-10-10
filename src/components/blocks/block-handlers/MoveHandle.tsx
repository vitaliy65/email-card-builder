import React, { RefObject } from "react";
import { Move } from "lucide-react";

type MoveHandleProps = {
  handleRef?: RefObject<HTMLDivElement | null>;
  setHovered?: (hovered: boolean) => void;
};

export default function MoveHandle({
  handleRef,
  setHovered = () => {},
}: MoveHandleProps) {
  return (
    <div
      ref={handleRef}
      className="absolute -right-4 top-1/2 -translate-y-1/2 bg-blue-400 text-white rounded-full p-1 w-8 h-8 opacity-0 group-hover:opacity-100 cursor-move flex items-center justify-center z-20 select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Don't intercept mouse down for move, let Draggable handle it via dragHandleRef
    >
      <Move className="w-full h-full" />
    </div>
  );
}
