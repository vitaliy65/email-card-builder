"use client";

import React from "react";
import { ColumnsBlockItem } from "@/types/block";
import { ColumnBlockDefault } from "@/data/blocks";
import DroppableBlock from "./DroppableBlock";

export default function ColumnsBlock({
  props = ColumnBlockDefault,
}: {
  props: ColumnsBlockItem;
}) {
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${props.columnsCount}, 1fr)`,
        ...props.gridProps,
      }}
    >
      {props.columnsCount !== 0 ? (
        props.columns?.map((col) => {
          return (
            <div
              key={col.id}
              style={{
                ...col.styles,
              }}
            >
              {col.content ? (
                col.content
              ) : (
                <DroppableBlock id={`${col.id}`}></DroppableBlock>
              )}
            </div>
          );
        })
      ) : (
        <DroppableBlock id={`${props.id}`}>
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
