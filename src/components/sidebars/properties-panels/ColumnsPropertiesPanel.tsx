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
  }, [block.uuid, columnCount]);

  // Вынесенный обработчик для изменения количества колонок
  function handleColumnCountChange(e: React.ChangeEvent<HTMLInputElement>) {
    let count = Number(e.target.value);
    if (isNaN(count) || count < 1) count = 1;
    if (count > 4) count = 4;
    setColumnCount(count);

    // Синхронизируем массив columns с count
    let newColumns = Array.isArray(block.columns) ? [...block.columns] : [];
    if (count > newColumns.length) {
      // Добавляем новые колонки с пустым контентом
      for (let i = newColumns.length; i < count; i++) {
        newColumns.push({ content: null });
      }
    } else if (count < newColumns.length) {
      // Удаляем лишние колонки
      newColumns = newColumns.slice(0, count);
    }

    // Передаём и новое columns, и columnsCount
    onChangeBlockField({ columns: newColumns, columnsCount: count });
  }

  // Вынесенный обработчик для блюра инпута количества колонок
  function handleColumnCountBlur(e: React.FocusEvent<HTMLInputElement>) {
    let count = Number(e.target.value);
    if (isNaN(count) || count < 1) count = 1;
    if (count > 4) count = 4;
    setColumnCount(count);

    // Синхронизируем массив columns с count
    let newColumns = Array.isArray(block.columns) ? [...block.columns] : [];
    if (count > newColumns.length) {
      for (let i = newColumns.length; i < count; i++) {
        newColumns.push({ content: null });
      }
    } else if (count < newColumns.length) {
      newColumns = newColumns.slice(0, count);
    }

    onChangeBlockField({ columns: newColumns, columnsCount: count });
  }

  // Вынесенный обработчик для изменения gap
  function handleGapChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    handleSaveProperty("gap", value);
    onChange({ gap: value });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-xs font-semibold text-foreground">Grid</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="12px"
            className="bg-background border-input"
            value={properties?.gap || ""}
            onChange={handleGapChange}
          />
          <Input
            placeholder="1"
            className="bg-background border-input"
            type="number"
            value={columnCount ?? ""}
            min={1}
            max={4}
            onChange={handleColumnCountChange}
            onBlur={handleColumnCountBlur}
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
