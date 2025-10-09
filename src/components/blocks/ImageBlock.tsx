/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { CanvasBlockItem } from "@/types/block";

interface ImageBlockProps {
  src?: string;
  alt?: string;
  styles?: CanvasBlockItem;
  onSrcChange?: (newSrc: string) => void;
  onAltChange?: (newAlt: string) => void;
}

const defaultSrc = "https://placehold.co/400x200/png?text=Image";
const defaultAlt = "Image";
const defaultStyles: CanvasBlockItem = {
  backgroundColor: "#f3f4f6",
  padding: "8px",
  margin: "0",
  borderRadius: "8px",
  borderColor: "#e5e7eb",
  borderWidth: "1px",
  borderStyle: "solid",
  width: "100%",
  height: "auto",
};

export default function ImageBlock({
  src = defaultSrc,
  alt = defaultAlt,
  styles = defaultStyles,
  onSrcChange,
  onAltChange,
}: ImageBlockProps) {
  // Handler for image src change (for future extensibility)
  const handleSrcInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (onSrcChange) {
      onSrcChange(e.currentTarget.value);
    }
  };

  // Handler for alt text change (for future extensibility)
  const handleAltInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (onAltChange) {
      onAltChange(e.currentTarget.value);
    }
  };

  return (
    <div
      style={{
        backgroundColor: styles.backgroundColor,
        padding: styles.padding,
        margin: styles.margin,
        borderRadius: styles.borderRadius,
        borderColor: styles.borderColor,
        borderWidth: styles.borderWidth,
        borderStyle: styles.borderWidth ? "solid" : undefined,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: styles.width,
        height: styles.height,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: "100%",
          maxHeight: "300px",
          borderRadius: styles.borderRadius,
          display: "block",
        }}
        draggable={false}
      />
    </div>
  );
}
