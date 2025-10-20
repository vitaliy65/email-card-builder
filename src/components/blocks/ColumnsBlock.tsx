"use client";

import React from "react";
import { ColumnsBlockItem, BlockTypes } from "@/types/block";
import { ColumnBlockDefault } from "@/data/blocks";
import { blockComponents } from "@/data/blockComponents";
import DroppableBlock from "./DroppableBlock";

export default function ColumnsBlock({
  props = ColumnBlockDefault,
}: {
  props?: ColumnsBlockItem;
}) {
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${props.columnsCount?.toString()}, 1fr)`,
        ...props.properties,
      }}
    >
      {props.columnsCount && props.columnsCount > 0 ? (
        props.columns?.map((col) => {
          return (
            <div key={col.id}>
              {col.content ? (
                (() => {
                  const blockType = col.content.type as BlockTypes;
                  const BlockComponent = blockComponents[blockType];

                  if (!BlockComponent) return null;

                  // Используем JSX с type assertion
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  return <BlockComponent props={col.content as any} />;
                })()
              ) : (
                <DroppableBlock id={`col_${props.uuid}_${col.id}`} />
              )}
            </div>
          );
        })
      ) : (
        <DroppableBlock id={`col_${props.uuid}`}>
          <p className="text-blue-700 text-center">
            No content here. Drag content from left
            <br />
            and set up columns
          </p>
        </DroppableBlock>
      )}
    </div>
  );
}
