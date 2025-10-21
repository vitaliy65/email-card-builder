import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectBlockFromColumn,
  setSelectedColumnChildUUID,
} from "@/store/slices/blocksSlice";

export default function ColumnBlockContainer({
  children,
  uuid,
  idx,
  columnUUID,
}: {
  children: ReactNode;
  uuid: string;
  idx: number;
  columnUUID: string;
}) {
  const { selectedColumnChildBlockUUID, selectedColumnBlockUUID } =
    useAppSelector((state) => state.blocks);

  // Блок считается выбранным, если его uuid совпадает с выбранным дочерним uuid И его colunaUUID - с выбранной колонкой
  const isSelected =
    selectedColumnChildBlockUUID === uuid &&
    selectedColumnBlockUUID === columnUUID;

  const [isHovered, setIsHovered] = useState(false);
  const [isLeaved, setIsLeaved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  // При клике: выбираем и блок в колонке, и УСТАНАВЛИВАЕМ оба uuid (блока и колонки)
  const handleSelectBlock = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(selectBlockFromColumn({ columnUUID, idx }));
    dispatch(setSelectedColumnChildUUID({ uuid }));
  };

  useEffect(() => {
    // Когда выбранный uuid поменялся снаружи — снимаем ховер
    setIsHovered(false);
    setIsLeaved(false);
  }, [isSelected]);

  if (isSelected)
    return (
      <div
        ref={containerRef}
        className="flex relative ring-2 ring-blue-600 w-full min-h-[32px]"
      >
        {children}
      </div>
    );

  return (
    <div className="flex relative group w-full min-h-[32px]">
      {children}
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
        onClick={handleSelectBlock}
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
      </div>
    </div>
  );
}
