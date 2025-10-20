"use client";

import React from "react";
import { ColumnsBlockItem, BlockTypes } from "@/types/block";
import { ColumnBlockDefault } from "@/data/blocks";
import { blockComponents } from "@/data/blockComponents";
import DroppableBlock from "./DroppableBlock";

// Always use a controlled columnsCount for safety
function getColumnCount(value: number | undefined) {
  // Ensure the value is always a number >= 1 for a controlled input
  if (typeof value === "number" && value > 0 && Number.isFinite(value))
    return value;
  return 1; // Default to 1 column for controlled component safety
}

export default function ColumnsBlock({
  props = ColumnBlockDefault,
}: {
  props?: ColumnsBlockItem;
}) {
  const columnsCount = getColumnCount(props.columnsCount);

  // Use columns from props if present and at least columnsCount long, otherwise build an array of {id, content}
  const columnsArr = [];
  for (let i = 0; i < columnsCount; i++) {
    const col =
      props.columns && props.columns[i]
        ? props.columns[i]
        : { id: `col_${props.uuid}_${i}`, content: null };
    columnsArr.push(col);
  }

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`,
        ...props.properties,
      }}
    >
      {columnsArr.length > 0 &&
        columnsArr.map((col, idx) => (
          <div key={`col_${props.uuid}_${idx}`}>
            {col.content ? (
              (() => {
                const blockType = col.content.type as BlockTypes;
                const BlockComponent = blockComponents[blockType];

                if (!BlockComponent) return null;

                return <BlockComponent props={col.content} />;
              })()
            ) : (
              <DroppableBlock id={`col_${props.uuid}_${idx}`} />
            )}
          </div>
        ))}
    </div>
  );
}
