"use client";

import React, { useCallback } from "react";
import { ColumnsBlockItem } from "@/types/block";
import { ColumnBlockDefault } from "@/data/blocks";
import DroppableBlock from "./DroppableBlock";
// import { useAppDispatch } from "@/store/hooks";
// import { setHoveredBlockId } from "@/store/slices/blocksSlice";

export default function ColumnsBlock({
  props = ColumnBlockDefault,
}: {
  props: ColumnsBlockItem;
}) {
  // const dispatch = useAppDispatch();
  const generateUniqId = useCallback((id: string): string => {
    const newId = id + "-" + Date.now();
    return newId;
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${props.columnsCount}, 1fr)`,
      }}
      // onMouseEnter={()=>dispatch(setHoveredBlockId(id))}
    >
      {props.columns?.map((col) => {
        const uniqId = generateUniqId(col.id);
        return (
          <div
            key={uniqId}
            style={{
              ...col.styles,
            }}
          >
            {col.content ? (
              col.content
            ) : (
              <DroppableBlock id={`${uniqId}`}></DroppableBlock>
            )}
          </div>
        );
      })}
    </div>
  );
}
