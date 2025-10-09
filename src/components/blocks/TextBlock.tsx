"use client";

import React from "react";
import { CanvasBlockItem } from "@/types/block";

interface TextBlockProps {
  content?: string;
  styles?: CanvasBlockItem;
  onContentChange?: (newContent: string) => void;
}

const defaultContent = "Double-click to edit this text";
const defaultStyles: CanvasBlockItem = {
  backgroundColor: "#ffffff",
  padding: "12px 0",
  margin: "0",
  fontSize: "16px",
  fontWeight: 400,
  color: "#222222",
};

export default function TextBlock({
  content = defaultContent,
  styles = defaultStyles,
  onContentChange,
}: TextBlockProps) {
  // Handler for content editable changes
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (onContentChange) {
      onContentChange(e.currentTarget.innerText);
    }
  };

  return (
    <div
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
    </div>
  );
}
