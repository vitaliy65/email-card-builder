"use client";

import { ButtonBlockDefault } from "@/data/blocks";
import { BlockItem } from "@/types/block";
import React from "react";

export default function ButtonBlock({
  props = ButtonBlockDefault,
}: {
  props?: BlockItem;
}) {
  return (
    <button
      style={{
        ...props.properties,
      }}
      type="button"
      onClick={props.onClick}
    >
      {props.properties?.content}
    </button>
  );
}
