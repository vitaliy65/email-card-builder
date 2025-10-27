"use client";

import { HeadingBlockDefault } from "@/data/blocks";
import { BlockItem } from "@/types/block";
import React from "react";

export default function HeadingBlock({
  props = HeadingBlockDefault,
}: {
  props?: BlockItem;
}) {
  return (
    <h2
      style={{
        ...props.properties,
      }}
    >
      {props.properties?.content}
    </h2>
  );
}
