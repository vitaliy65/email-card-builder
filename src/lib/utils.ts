import { blockDefaults } from "@/data/blocks";
import { CanvasBlock } from "@/store/slices/blocksSlice";
import { BlockItem, BlockTypes, GridElement } from "@/types/block";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ensurePx(value: string) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (
    trimmed.endsWith("px") ||
    trimmed.endsWith("%") ||
    trimmed.endsWith("em") ||
    trimmed.endsWith("rem") ||
    trimmed.endsWith("vw") ||
    trimmed.endsWith("vh") ||
    trimmed === "auto"
  ) {
    return trimmed;
  }
  return `${trimmed}px`;
}

// getCellContent адаптированная версия для gridElements (types/block.ts)
export function getCellContent({
  gridElements = [],
  rowIdx,
  colIdx,
}: {
  gridElements?: GridElement[][];
  rowIdx: number;
  colIdx: number;
}): BlockItem | null {
  if (
    Array.isArray(gridElements) &&
    gridElements[colIdx] &&
    gridElements[colIdx][rowIdx] &&
    typeof gridElements[colIdx][rowIdx] === "object"
  ) {
    const cell = gridElements[colIdx][rowIdx];
    if (cell?.content) return cell.content;
  }
  return null;
}

export function createCanvasBlock(blockType: BlockTypes): CanvasBlock {
  const blockTemplate = blockDefaults[blockType] as BlockItem;
  return {
    ...blockTemplate,
    uuid: uuidv4(),
    properties: {
      ...blockTemplate.properties,
    },
  } as CanvasBlock;
}
