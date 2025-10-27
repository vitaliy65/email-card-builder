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
  setSelectedColumnChildUUID,
  setSelectedColumnUUID,
} from "@/store/slices/blocksSlice";
import { useAppDispatch } from "@/store/hooks";
import { BlockTypes } from "@/types/block";

export default function BlockContainer({
  children,
  id,
  uuid,
  type,
}: {
  children: ReactNode;
  id: string;
  uuid: string;
  type: BlockTypes;
}) {
  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLeaved, setIsLeaved] = useState(false);
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
      dispatch(selectBlock({ uuid }));
      if (type === BlockTypes.columns) {
        dispatch(setSelectedColumnUUID({ uuid }));
      } else {
        dispatch(setSelectedColumnUUID({ uuid: null }));
        dispatch(setSelectedColumnChildUUID(null));
      }
      setIsSelected(true);
      setIsLeaved(false);
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
        setIsLeaved(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [isSelected]);

  if (isSelected)
    return (
      <div ref={containerRef} className="relative ring-2 ring-blue-600">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="min-h-[32px]">{children}</div>
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
      </div>
    );

  return (
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
              onMouseEnter={() => {
                setIsHovered(true);
                setIsLeaved(false);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                setIsLeaved(true);
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSelectBlock();
              }}
            >
              <div
                className={`w-full h-full
              ${
                isHovered && !isLeaved
                  ? "bg-blue-500/20 border-2 border-blue-400"
                  : ""
              } 
              transition-colors pointer-events-none`}
              ></div>
              <MoveHandle handleRef={handleRef} setHovered={setIsHovered} />
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
