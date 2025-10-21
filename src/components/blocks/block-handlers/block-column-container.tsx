import Draggable from "@/components/block-states/Draggable";
import { Trash2 } from "lucide-react";
import React, {
  ReactNode,
  RefObject,
  useRef,
  useState,
  useEffect,
} from "react";
import MoveHandle from "./MoveHandle";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import {
  removeBlock,
  selectBlock,
  setGrabbingBlock,
} from "@/store/slices/blocksSlice";
import { useAppDispatch } from "@/store/hooks";

export default function ColumnBlockContainer({
  children,
  id,
  uuid,
  isColumnBlock,
}: {
  children: ReactNode;
  id: string;
  uuid: string;
  isColumnBlock?: boolean;
}) {
  const [isSelected, setIsSelected] = useState(false);
  const [hovered, setHovered] = useState(false);
  const handleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
      setIsSelected(true);
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

  useEffect(() => {
    if (!isSelected) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsSelected(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [isSelected]);

  if (isSelected)
    return (
      <div ref={containerRef} className="relative">
        <div>
          <div className="min-h-[32px]">{children}</div>
          <div
            className={`w-full h-full
              ${hovered ? "bg-blue-500/20 border-2 border-blue-400" : ""} 
              transition-colors pointer-events-none`}
          ></div>
        </div>
      </div>
    );

  return (
    <div>
      <div className="min-h-[32px]">{children}</div>
      <div
        className={`w-full h-full
              ${hovered ? "bg-blue-500/20 border-2 border-blue-400" : ""} 
              transition-colors pointer-events-none`}
      ></div>
    </div>
  );
}
