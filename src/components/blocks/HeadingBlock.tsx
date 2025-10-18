"use client";

import { HeadingBlockDefault } from "@/data/blocks";
import { HeadingBlockItem } from "@/types/block";
import React from "react";

export default function HeadingBlock({
  props = HeadingBlockDefault,
}: {
  props?: HeadingBlockItem;
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
