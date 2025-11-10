"use client";
import useSaveProperties from "@/hooks/properties-panels/useSaveValue";
import { DividerPropertiesPanelProps } from "@/types/properties-panels";
import { useEffect } from "react";
import Colors from "./properties-blocks/Colors";
import Sizes from "./properties-blocks/Sizes";
import Offsets from "./properties-blocks/Offsets";

export default function DividerPropertiesPanel({
  block,
  onChange,
}: DividerPropertiesPanelProps) {
  const { properties, setProperties, handleSaveProperty } =
    useSaveProperties<React.CSSProperties>(undefined);

  useEffect(() => {
    setProperties(block.properties);
  }, [block.uuid]);

  return (
    <div className="space-y-6">
      <Colors
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
