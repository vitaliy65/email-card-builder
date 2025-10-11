import { useAppSelector, useAppDispatch } from "@/store/hooks";
import React from "react";
import { moveBetween } from "@/store/slices/blocksSlice";
import { cn } from "@/lib/utils";

type ChangPosBlockProps = {
  prevUuid: string | null;
  nextUuid: string | null;
};

// Этот компонент предназначен для отображения позиции,
// куда можно переместить перетаскиваемый блок (drop zone)
export default function ChangPosBlock({
  prevUuid,
  nextUuid,
}: ChangPosBlockProps) {
  const dispatch = useAppDispatch();
  const grabBlockUUID = useAppSelector((s) => s.blocks.grabingBlockUUID);

  // Обрабатываем drop события dnd-kit через HTML drag and drop
  const handleDrop = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      if (!grabBlockUUID) return;
      dispatch(
        moveBetween({
          blockId: grabBlockUUID,
          previousBlockId: prevUuid,
          nextBlockId: nextUuid,
        })
      );
    },
    [dispatch, grabBlockUUID, prevUuid, nextUuid]
  );

  if (!grabBlockUUID) return null;

  return (
    <div
      onMouseUpCapture={handleDrop}
      className={cn(
        "w-full h-fit relative justify-center items-center select-none py-2 my-2 border-2 border-blue-500 border-dashed bg-blue-500/30 rounded-sm",
        grabBlockUUID !== prevUuid && grabBlockUUID !== nextUuid
          ? "flex"
          : "hidden"
      )}
    >
      <div className="z-20 px-3 py-1 text-xs text-white bg-blue-500 rounded-full shadow-lg opacity-100 transition-opacity">
        Drop it here
      </div>
    </div>
  );
}
