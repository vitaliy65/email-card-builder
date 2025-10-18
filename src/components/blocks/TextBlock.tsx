"use client";

import { TextBlockDefault } from "@/data/blocks";
import { TextBlockItem } from "@/types/block";
import React from "react";

export default function TextBlock({
  props = TextBlockDefault,
}: {
  props?: TextBlockItem;
}) {
  return (
    <div
      style={{
        ...props.properties,
      }}
    >
      {props.properties?.content}
    </div>
  );
}
