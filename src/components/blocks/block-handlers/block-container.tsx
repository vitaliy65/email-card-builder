import Draggable from "@/components/block-states/Draggable";
import { Trash2 } from "lucide-react";
import React, { ReactNode, RefObject, useRef, useState } from "react";
import MoveHandle from "./MoveHandle";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { removeBlock } from "@/store/slices/blocksSlice";
import { useAppDispatch } from "@/store/hooks";

export default function BlockContainer({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  const [hovered, setHovered] = useState(false);
  const handleRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeBlock(id));
  };

  return (
    // Pass dragHandleRef to Draggable so only the Move div allows dragging
    <Draggable
      id={id}
      className="relative group"
      // Cast to unknown then HTMLElement to satisfy Draggable's RefObject<HTMLElement> requirement
      dragHandleRef={handleRef as RefObject<HTMLElement>}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
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
              <MoveHandle handleRef={handleRef} setHovered={setHovered} />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="bg-black rounded-lg flex items-center gap-2 p-2 mb-2">
            <button
              className=" p-1 rounded hover:bg-red-500 transition-colors"
              onClick={handleDelete}
              aria-label="Delete block"
              type="button"
            >
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </TooltipContent>
      </Tooltip>
    </Draggable>
  );
}
