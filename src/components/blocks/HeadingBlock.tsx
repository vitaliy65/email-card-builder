"use client";

import React from "react";
import { CanvasBlockItem } from "@/types/block";

interface HeadingBlockProps {
  content?: string;
  styles?: CanvasBlockItem;
  onContentChange?: (newContent: string) => void;
}

const defaultContent = "Double-click to edit this heading";
const defaultStyles: CanvasBlockItem = {
  backgroundColor: "#ffffff",
  padding: "16px 0",
  margin: "0",
  fontSize: "28px",
  fontWeight: 700,
  color: "#111111",
};

export default function HeadingBlock({
  content = defaultContent,
  styles = defaultStyles,
  onContentChange,
}: HeadingBlockProps) {
  // Handler for content editable changes
  const handleInput = (e: React.FormEvent<HTMLHeadingElement>) => {
    if (onContentChange) {
      onContentChange(e.currentTarget.innerText);
    }
  };

  return (
    <h2
      style={{
        backgroundColor: styles.backgroundColor,
        padding: styles.padding,
        margin: styles.margin,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        color: styles.color,
        borderRadius: styles.borderRadius,
        borderColor: styles.borderColor,
        borderWidth: styles.borderWidth,
        borderStyle: styles.borderWidth ? "solid" : undefined,
      }}
      contentEditable={!!onContentChange}
      suppressContentEditableWarning
      className="outline-none"
      onInput={handleInput}
      spellCheck={false}
    >
      {content}
    </h2>
  );
}
