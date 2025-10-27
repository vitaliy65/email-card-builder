"use client";
import { ImagePropertiesPanelProps } from "@/types/properties-panels";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Borders from "./properties-blocks/Borders";
import Sizes from "./properties-blocks/Sizes";
import Offsets from "./properties-blocks/Offsets";
import { useEffect } from "react";
import useSaveProperties from "@/hooks/properties-panels/useSaveValue";
import BlockJustification from "./properties-blocks/BlockJustification";
import ImageContain from "./properties-blocks/ImageContain";
import Colors from "./properties-blocks/Colors";

export default function ImagePropertiesPanel({
  block,
  onChange,
}: ImagePropertiesPanelProps) {
  const { properties, setProperties, handleSaveProperty } =
    useSaveProperties<React.CSSProperties>(undefined);

  useEffect(() => {
    setProperties(block.properties);
  }, [block.uuid]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-xs font-semibold text-foreground">Image</Label>
        <Input
          placeholder="Image URL"
          className="bg-background border-input"
          value={block.src || ""}
          onChange={(e) => {
            onChange({ src: e.target.value });
          }}
        />
        <Input
          placeholder="Alt text"
          className="bg-background border-input"
          value={block.alt || ""}
          onChange={(e) => {
            onChange({ alt: e.target.value });
          }}
        />
      </div>
      <BlockJustification
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={onChange}
      />
      <ImageContain
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={onChange}
      />
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
      <Borders
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
