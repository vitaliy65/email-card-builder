"use client";

import React from "react";
import { CanvasBlockItem } from "@/types/block";
import DroppableBlock from "./DroppableBlock";

interface Column {
  id: string;
  content?: React.ReactNode;
  styles?: CanvasBlockItem;
}

interface ColumnsBlockProps {
  columns?: Column[];
  styles?: CanvasBlockItem;
}

const defaultColumnStyles: CanvasBlockItem = {
  padding: "0px",
  backgroundColor: "#ffffff",
  borderRadius: "0px",
  borderColor: "#e5e7eb",
  borderWidth: "0px",
  borderStyle: "solid",
};

const defaultStyles: CanvasBlockItem = {
  display: "flex",
  gap: "16px",
  width: "100%",
};

export default function ColumnsBlock({
  columns = [
    { id: "col-1", content: <DroppableBlock id={"col-1"} /> },
    { id: "col-2", content: <DroppableBlock id={"col-2"} /> },
  ],
  styles = defaultStyles,
}: ColumnsBlockProps) {
  return (
    <div
      style={{
        display: styles.display ?? "flex",
        gap: styles.gap ?? "16px",
        width: styles.width ?? "100%",
        ...styles,
      }}
    >
      {columns.map((col) => (
        <div
          key={col.id}
          style={{
            flex: 1,
            padding: col.styles?.padding ?? defaultColumnStyles.padding,
            backgroundColor:
              col.styles?.backgroundColor ??
              defaultColumnStyles.backgroundColor,
            borderRadius:
              col.styles?.borderRadius ?? defaultColumnStyles.borderRadius,
            borderColor:
              col.styles?.borderColor ?? defaultColumnStyles.borderColor,
            borderWidth:
              col.styles?.borderWidth ?? defaultColumnStyles.borderWidth,
            borderStyle:
              col.styles?.borderStyle ??
              (col.styles?.borderWidth
                ? "solid"
                : defaultColumnStyles.borderStyle),
            ...col.styles,
          }}
        >
          {col.content}
        </div>
      ))}
    </div>
  );
}
