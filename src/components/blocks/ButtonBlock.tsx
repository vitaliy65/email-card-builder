"use client";

import React from "react";
import { CanvasBlockItem } from "@/types/block";

interface ButtonBlockProps {
  content?: string;
  styles?: CanvasBlockItem;
  onContentChange?: (newContent: string) => void;
}

const defaultContent = "Click Me";
const defaultStyles: CanvasBlockItem = {
  backgroundColor: "#2563eb",
  padding: "12px 32px",
  margin: "0",
  fontSize: "16px",
  fontWeight: 600,
  color: "#ffffff",
  borderRadius: "6px",
};

export default function ButtonBlock({
  content = defaultContent,
  styles = defaultStyles,
  onContentChange,
}: ButtonBlockProps) {
  // Handler for content editable changes
  const handleInput = (e: React.FormEvent<HTMLButtonElement>) => {
    if (onContentChange) {
      onContentChange(e.currentTarget.innerText);
    }
  };

  return (
    <button
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
        cursor: "pointer",
        outline: "none",
      }}
      contentEditable={!!onContentChange}
      suppressContentEditableWarning
      className="outline-none"
      onInput={handleInput}
      spellCheck={false}
      tabIndex={0}
      type="button"
    >
      {content}
    </button>
  );
}
