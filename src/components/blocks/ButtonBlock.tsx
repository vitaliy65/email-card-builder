"use client";

import { ButtonBlockDefault } from "@/data/blocks";
import { ButtonBlockItem } from "@/types/block";
import React from "react";

export default function ButtonBlock({
  props = ButtonBlockDefault,
}: {
  props?: ButtonBlockItem;
}) {
  return (
    <button
      style={{
        ...props.properties,
      }}
      type="button"
    >
      {props.properties?.content}
    </button>
  );
}
