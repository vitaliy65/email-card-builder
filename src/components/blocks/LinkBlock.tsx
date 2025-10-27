"use client";

import { LinkBlockDefault } from "@/data/blocks";
import { BlockItem } from "@/types/block";
import Link from "next/link";
import React from "react";

export default function LinkBlock({
  props = LinkBlockDefault,
}: {
  props?: BlockItem;
}) {
  return (
    <div
      style={{
        ...props.properties,
      }}
    >
      <Link href={props?.href || "#"}>{props.properties?.content}</Link>
    </div>
  );
}
