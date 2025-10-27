"use client";

import React from "react";
import { ColumnsBlockItem, GridElement } from "@/types/block";
import { ColumnBlockDefault } from "@/data/blocks";
import { getCellContent } from "@/lib/utils";
import { ColumnBlockCell } from "./columnsBlock/ColumnBlockCell";

/**
 * Корректная нумерация и ключи ячеек для ColumnsBlock:
 * - сначала внешний цикл по col (колонка), внутренний по row (ряд/строка)
 * - gridElements[col][row] (col - колонка, row - строка) соответствует внутренней структуре
 * - ключ формируется из uuid, row, col (строка-колонка, см. компонент ColumnBlockCell по ожиданию)
 */

export default function ColumnsBlock({
  props = ColumnBlockDefault,
}: {
  props?: ColumnsBlockItem;
}) {
  const columnsCount = props.columnsCount ?? 1;
  const rowsCount = props.rowsCount ?? 1;

  // Стреогая инициализация gridElements — всегда columnsCount длины, каждая колонка — массив rowsCount длины
  const gridElements: GridElement[][] =
    Array.isArray(props.gridElements) &&
    props.gridElements.length === columnsCount
      ? props.gridElements
      : Array.from({ length: columnsCount }, () =>
          Array.from({ length: rowsCount })
        );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rowsCount}, minmax(0, 1fr))`,
        ...(props.properties || {}),
      }}
      className="w-full h-auto"
    >
      {Array.from({ length: columnsCount }).map((_, col) =>
        Array.from({ length: rowsCount }).map((_, row) => {
          // Важно: gridElements[col][row] (именно так! column major)
          const cellContent = getCellContent({
            gridElements,
            rowIdx: row,
            colIdx: col,
          });
          const key = `cell_${props.uuid}_${col}_${row}`; // col, row (column first, row second)
          return (
            <div key={key} className="w-full h-full flex">
              <ColumnBlockCell
                columnUUID={props.uuid}
                uuid={cellContent ? cellContent.uuid : undefined}
                col_idx={col}
                row_idx={row}
                cellContent={cellContent}
              />
            </div>
          );
        })
      )}
    </div>
  );
}
