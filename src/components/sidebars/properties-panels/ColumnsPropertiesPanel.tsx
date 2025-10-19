"use client";
import { ColumnsPropertiesPanelProps } from "@/types/properties-panels";
import Colors from "./properties-blocks/Colors";
import Borders from "./properties-blocks/Borders";
import Sizes from "./properties-blocks/Sizes";
import Offsets from "./properties-blocks/Offsets";
import useSaveProperties from "@/hooks/properties-panels/useSaveValue";
import { GridProperties } from "@/types/block";
import { useEffect, useState } from "react";

export default function ColumnsPropertiesPanel({
  block,
  onChange,
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
      {/* <div className="space-y-3">
        <Label className="text-xs font-semibold text-foreground">Grid</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="12px"
            className="bg-background border-input"
            value={properties?.gap || ""}
            onChange={(e) => {
              const value = e.target.value;
              // Сразу отражаем в UI и диспатчим наружу
              handleSaveProperty("gap", value);
              onChange({
                ...block,
                properties: { ...properties, gap: value },
              });
            }}
          />
          <Input
            placeholder="0"
            className="bg-background border-input"
            type="number"
            value={columnCount ?? ""}
            min={1}
            onChange={(e) => {
              const count = Number(e.target.value);
              setColumnCount(count);
              onChange({
                ...block,
                columnsCount: count,
                properties: { ...properties },
              });
            }}
          />
        </div>
      </div> */}

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
