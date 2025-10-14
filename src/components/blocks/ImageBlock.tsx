/* eslint-disable @next/next/no-img-element */
"use client";

import { ImageBlockDefault } from "@/data/blocks";
import { ImageBlockItem } from "@/types/block";
import React from "react";

export default function ImageBlock({
  props = ImageBlockDefault,
}: {
  props: ImageBlockItem;
}) {
  return (
    <div
      style={{
        ...props.properties,
      }}
    >
      <img
        src={props.src}
        alt={props.alt}
        style={{
          maxWidth: "100%",
          maxHeight: "300px",
          display: "block",
        }}
        draggable={false}
      />
    </div>
  );
}
