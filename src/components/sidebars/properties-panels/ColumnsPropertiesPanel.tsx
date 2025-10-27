"use client";
import { ColumnsPropertiesPanelProps } from "@/types/properties-panels";
import Colors from "./properties-blocks/Colors";
import Borders from "./properties-blocks/Borders";
import Sizes from "./properties-blocks/Sizes";
import Offsets from "./properties-blocks/Offsets";
import useSaveProperties from "@/hooks/properties-panels/useSaveValue";
import { useEffect, useState, ChangeEvent, FocusEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GridElement } from "@/types/block";

// Утилита для ограничения значения между min и max
function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

// Синхронизировать gridElements двумерный массив (кол-во столбцов и строк)
function syncGridElements(
  gridElements: GridElement[][] | undefined,
  columns: number,
  rows: number
) {
  // Создаем копию или новую сетку
  let newGrid: GridElement[][] = [];
  if (Array.isArray(gridElements)) {
    newGrid = gridElements.map((col) =>
      Array.isArray(col) ? col.slice(0, rows) : []
    );
  }

  // Убедимся в нужном количестве столбцов
  while (newGrid.length < columns) {
    newGrid.push(Array(rows).fill({ content: null }));
  }

  if (newGrid.length > columns) {
    newGrid.length = columns;
  }

  // Убедимся в нужном количестве строк в каждом столбце
  for (let c = 0; c < columns; c++) {
    if (!newGrid[c]) newGrid[c] = [];
    for (let r = 0; r < rows; r++) {
      if (typeof newGrid[c][r] === "undefined") {
        newGrid[c][r] = { content: null };
      }
    }
    // Обрезаем лишние строки
    if (newGrid[c].length > rows) newGrid[c].length = rows;
  }

  return newGrid;
}

export default function ColumnsPropertiesPanel({
  block,
  onChange,
}: ColumnsPropertiesPanelProps) {
  const { properties, setProperties, handleSaveProperty } =
    useSaveProperties<React.CSSProperties>(undefined);

  const [columnCount, setColumnCount] = useState(block.columnsCount ?? 1);
  const [rowsCount, setRowsCount] = useState(block.rowsCount ?? 1);

  useEffect(() => {
    setColumnCount(block.columnsCount ?? 1);
    setRowsCount(block.rowsCount ?? 1);
    setProperties(block.properties);
  }, [block.uuid]);

  // Обновить кол-во колонок/строк и gridElements
  const handleChangeGrid = (newColCount: number, newRowCount: number) => {
    // Ограничения
    const colCount = clamp(newColCount, 1, 4);
    const rowCount = clamp(newRowCount, 1, 4);

    setColumnCount(colCount);
    setRowsCount(rowCount);

    const newGridElements = syncGridElements(
      block.gridElements,
      colCount,
      rowCount
    );

    // Передать изменения наружу
    onChange({
      ...block,
      columnsCount: colCount,
      rowsCount: rowCount,
      gridElements: newGridElements,
    });
  };

  const handleColumnCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const count = Number(e.target.value);
    handleChangeGrid(count, rowsCount);
  };

  const handleRowsCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const count = Number(e.target.value);
    handleChangeGrid(columnCount, count);
  };

  const handleColumnCountBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    handleChangeGrid(value, rowsCount);
  };
  const handleRowsCountBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    handleChangeGrid(columnCount, value);
  };

  const handleGapChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSaveProperty("gap", value);
    onChange({
      ...block,
      properties: {
        ...block.properties,
        gap: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-xs font-semibold text-foreground">Grid</Label>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="12px"
            className="bg-background border-input"
            value={properties?.gap || ""}
            onChange={handleGapChange}
          />
          <Label className="text-xs font-semibold text-foreground">Cols</Label>
          <Input
            placeholder="1"
            className="bg-background border-input"
            type="number"
            value={columnCount}
            min={1}
            max={4}
            onChange={handleColumnCountChange}
            onBlur={handleColumnCountBlur}
          />
          <Label className="text-xs font-semibold text-foreground">Rows</Label>
          <Input
            placeholder="1"
            className="bg-background border-input"
            type="number"
            value={rowsCount}
            min={1}
            max={4}
            onChange={handleRowsCountChange}
            onBlur={handleRowsCountBlur}
          />
        </div>
      </div>

      <Colors
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={(cssProps) =>
          onChange({
            ...block,
            properties: {
              ...block.properties,
              ...cssProps,
            },
          })
        }
      />
      <Borders
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={(cssProps) =>
          onChange({
            ...block,
            properties: {
              ...block.properties,
              ...cssProps,
            },
          })
        }
      />
      <Sizes
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={(cssProps) =>
          onChange({
            ...block,
            properties: {
              ...block.properties,
              ...cssProps,
            },
          })
        }
      />
      <Offsets
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={(cssProps) =>
          onChange({
            ...block,
            properties: {
              ...block.properties,
              ...cssProps,
            },
          })
        }
      />
    </div>
  );
}
