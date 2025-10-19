/* eslint-disable @next/next/no-img-element */
"use client";

import { ImageBlockDefault } from "@/data/blocks";
import { ImageBlockItem } from "@/types/block";
import React from "react";

export default function ImageBlock({
  props = ImageBlockDefault,
}: {
  props?: ImageBlockItem;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: props.properties?.alignItems,
        justifyContent: props.properties?.justifyContent,
        width: "100%",
      }}
    >
      <img
        src={props.src}
        alt={props.alt}
        style={{
          ...props.properties,
        }}
        draggable={false}
      />
    </div>
  );
}
