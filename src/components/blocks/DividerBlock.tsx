"use client";

import React from "react";
import { BlockItem } from "@/types/block";
import { DividerBlockDefault } from "@/data/blocks";

export default function DividerBlock({
  props = DividerBlockDefault,
}: {
  props: BlockItem;
}) {
  return (
    <hr
      style={{
        ...props.properties,
      }}
    />
  );
}
