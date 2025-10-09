"use client";

import React from "react";
import { CanvasBlockItem } from "@/types/block";

interface SpacerBlockProps {
  styles?: CanvasBlockItem;
}

const defaultStyles: CanvasBlockItem = {
  height: "24px",
  width: "100%",
};

export default function SpacerBlock({
  styles = defaultStyles,
}: SpacerBlockProps) {
  return (
    <div
      style={{
        height: styles.height,
        width: styles.width,
      }}
      aria-hidden="true"
    />
  );
}
