"use client";

import React from "react";
import { CanvasBlockItem } from "@/types/block";

interface DividerBlockProps {
  styles?: CanvasBlockItem;
}

const defaultStyles: CanvasBlockItem = {
  margin: "16px 0",
  borderColor: "#e5e7eb",
  borderWidth: "1px",
  borderStyle: "solid",
  width: "100%",
};

export default function DividerBlock({
  styles = defaultStyles,
}: DividerBlockProps) {
  return (
    <hr
      style={{
        margin: styles.margin,
        borderColor: styles.borderColor,
        borderWidth: styles.borderWidth,
        borderStyle:
          styles.borderStyle ?? (styles.borderWidth ? "solid" : undefined),
        width: styles.width,
      }}
    />
  );
}
