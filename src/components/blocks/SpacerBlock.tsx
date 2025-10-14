"use client";

import React from "react";
import { BlockItem } from "@/types/block";
import { SpacerBlockDefault } from "@/data/blocks";

export default function SpacerBlock({
  props = SpacerBlockDefault,
}: {
  props: BlockItem;
}) {
  return (
    <div
      style={{
        ...props.properties,
      }}
      aria-hidden="true"
    />
  );
}
