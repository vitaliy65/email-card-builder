"use client";
import useSaveProperties from "@/hooks/properties-panels/useSaveValue";
import { GridProperties } from "@/types/block";
import { DividerPropertiesPanelProps } from "@/types/properties-panels";
import { useEffect } from "react";
import Colors from "./properties-blocks/Colors";
import Borders from "./properties-blocks/Borders";
import Sizes from "./properties-blocks/Sizes";
import Offsets from "./properties-blocks/Offsets";

export default function DividerPropertiesPanel({
  block,
  onChange,
}: DividerPropertiesPanelProps) {
  const { properties, setProperties, handleSaveProperty } =
    useSaveProperties<GridProperties>(undefined);

  useEffect(() => {
    setProperties(block.properties);
  }, [block.uuid, block.properties, setProperties]);

  return (
    <div className="space-y-6">
      <Colors
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={onChange}
      />
      <Borders
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={onChange}
      />
      <Sizes
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={onChange}
      />
      <Offsets
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={onChange}
      />
    </div>
  );
}
