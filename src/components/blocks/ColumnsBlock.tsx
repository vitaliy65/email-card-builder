"use client";

import React from "react";
import { CanvasBlockItem } from "@/types/block";

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
  padding: "8px",
  backgroundColor: "#f9fafb",
  borderRadius: "6px",
  borderColor: "#e5e7eb",
  borderWidth: "1px",
  borderStyle: "solid",
};

const defaultStyles: CanvasBlockItem = {
  display: "flex",
  gap: "16px",
  width: "100%",
};

export default function ColumnsBlock({
  columns = [
    { id: "col-1", content: <div>Column 1</div> },
    { id: "col-2", content: <div>Column 2</div> },
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
