"use client";

import React from "react";
import { ColumnsBlockItem, BlockTypes } from "@/types/block";
import { ColumnBlockDefault } from "@/data/blocks";
import { blockComponents } from "@/data/blockComponents";
import DroppableBlock from "./DroppableBlock";
import ColumnBlockContainer from "./block-handlers/block-column-container";

export default function ColumnsBlock({
  props = ColumnBlockDefault,
}: {
  props?: ColumnsBlockItem;
}) {
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${props.columnsCount}, minmax(0, 1fr))`,
        ...props.properties,
      }}
    >
      {props.columns &&
        props.columns.map((col, idx) => (
          <div key={`col_${props.uuid}_${idx}`} className="flex">
            {col.content ? (
              (() => {
                const blockType = col.content.type as BlockTypes;
                const BlockComponent = blockComponents[blockType];

                if (!BlockComponent) return null;

                return (
                  <ColumnBlockContainer
                    columnUUID={props.uuid}
                    uuid={col.content?.uuid}
                    idx={idx}
                  >
                    <BlockComponent props={col.content} />
                  </ColumnBlockContainer>
                );
              })()
            ) : (
              <DroppableBlock id={`col_${props.uuid}_${idx}`} />
            )}
          </div>
        ))}
    </div>
  );
}
