import Draggable from "@/components/block-states/Draggable";
import { Trash2 } from "lucide-react";
import React, { ReactNode, RefObject, useRef, useState } from "react";
import MoveHandle from "./MoveHandle";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import {
  removeBlock,
  selectBlock,
  setGrabbingBlock,
} from "@/store/slices/blocksSlice";
import { useAppDispatch } from "@/store/hooks";

/**
 * BlockContainer отслеживает начало и конец drag-and-drop,
 * чтобы сохранять uuid перетаскиваемого блока в redux.
 */
export default function BlockContainer({
  children,
  id,
  uuid,
}: {
  children: ReactNode;
  id: string;
  uuid: string;
}) {
  const [hovered, setHovered] = useState(false);
  const handleRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeBlock(uuid));
  };

  // Функция вызывается при начале drag (через Draggable)
  const handleDragStart = () => {
    dispatch(setGrabbingBlock(uuid));
  };

  const handleSelectBlock = () => {
    try {
      dispatch(selectBlock(uuid));
    } catch {
      console.error("Cant select this block! :(");
    }
  };

  // Функция вызывается при окончании drag (через Draggable)
  // Добавляем задержку при завершении перетаскивания
  const handleDragEnd = () => {
    setTimeout(() => {
      dispatch(setGrabbingBlock(null));
    }, 150); // Задержка 150 мс
  };

  return (
    // Pass dragHandleRef and drag event handlers to Draggable
    <Draggable
      id={uuid}
      className="relative group"
      dragHandleRef={handleRef as RefObject<HTMLElement>}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <div className="min-h-[32px]">{children}</div>
            <div
              className="absolute inset-0"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={handleSelectBlock}
            >
              <div
                className={`w-full h-full
            ${hovered ? "bg-blue-500/20 border-2 border-blue-400" : ""} 
            transition-colors pointer-events-none z-10`}
              ></div>
              <MoveHandle handleRef={handleRef} setHovered={setHovered} />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left">
          <div className="bg-black rounded-lg flex items-center gap-2 p-2 mr-2">
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
