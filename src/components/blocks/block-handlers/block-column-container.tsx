import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectBlockFromGrid,
  setSelectedColumnChildUUID,
} from "@/store/slices/blocksSlice";
import { BlockItem } from "@/types/block";

export default function ColumnBlockContainer({
  children,
  cell,
  col_idx,
  row_idx,
  columnUUID,
}: {
  children: ReactNode;
  cell: BlockItem;
  col_idx: number;
  row_idx: number;
  columnUUID: string;
}) {
  const { selectedGridChildData, selectedGridBlockUUID } = useAppSelector(
    (state) => state.blocks
  );

  // Блок считается выбранным, если его uuid совпадает с выбранным дочерним uuid И его colunaUUID - с выбранной колонкой
  const isSelected =
    selectedGridChildData?.cell?.uuid === cell.uuid &&
    selectedGridBlockUUID === columnUUID;

  const [isHovered, setIsHovered] = useState(false);
  const [isLeaved, setIsLeaved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  // При клике: выбираем и блок в колонке, и УСТАНАВЛИВАЕМ оба uuid (блока и колонки)
  const handleSelectBlock = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(selectBlockFromGrid({ col_idx, row_idx }));
    dispatch(setSelectedColumnChildUUID({ cell, col_idx, row_idx }));
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
