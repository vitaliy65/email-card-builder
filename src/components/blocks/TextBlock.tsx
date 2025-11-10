"use client";

import { TextBlockDefault } from "@/data/blocks";
import { BlockItem } from "@/types/block";
import React from "react";

export default function TextBlock({
  props = TextBlockDefault,
}: {
  props?: BlockItem;
}) {
  return (
    <>
      <div
        style={{
          ...props.properties,
        }}
      >
        {props.properties?.content}
      </div>
    </>
  );
}
