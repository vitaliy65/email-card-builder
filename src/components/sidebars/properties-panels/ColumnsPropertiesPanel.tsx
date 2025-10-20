"use client";
import { ColumnsPropertiesPanelProps } from "@/types/properties-panels";
import Colors from "./properties-blocks/Colors";
import Borders from "./properties-blocks/Borders";
import Sizes from "./properties-blocks/Sizes";
import Offsets from "./properties-blocks/Offsets";
import useSaveProperties from "@/hooks/properties-panels/useSaveValue";
import { GridProperties } from "@/types/block";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ColumnsPropertiesPanel({
  block,
  onChange,
  onChangeBlockField,
}: ColumnsPropertiesPanelProps) {
  const { properties, setProperties, handleSaveProperty } =
    useSaveProperties<GridProperties>(undefined);

  // Чтобы корректно поддерживать синхронизацию columnsCount при смене block
  const [columnCount, setColumnCount] = useState(block.columnsCount);

  useEffect(() => {
    setColumnCount(block.columnsCount);
    setProperties(block.properties);
  }, [block.columnsCount, block.uuid]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-xs font-semibold text-foreground">Grid</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="12px"
            className="bg-background border-input"
            value={properties?.gap || ""}
            onChange={(e) => {
              const value = e.target.value;
              handleSaveProperty("gap", value);
              onChange({ gap: value });
            }}
          />
          <Input
            placeholder="1"
            className="bg-background border-input"
            type="number"
            value={columnCount ?? ""}
            min={1}
            max={4}
            onChange={(e) => {
              let count = Number(e.target.value);
              if (count > 4) count = 4;
              if (count < 1) count = 1;
              setColumnCount(count);
              onChangeBlockField({ columnsCount: count });
            }}
            onBlur={(e) => {
              let count = Number(e.target.value);
              if (isNaN(count) || count < 1) count = 1;
              if (count > 4) count = 4;
              setColumnCount(count);
              onChangeBlockField({ columnsCount: count });
            }}
          />
        </div>
      </div>

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
