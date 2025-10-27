// store/blocksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlockItem, ColumnsBlockItem, GridElement } from "@/types/block";
import React from "react";

// Расширяем BlockItem для блоков на Canvas
export interface CanvasBlock extends BlockItem {
  uuid: string; // уникальный идентификатор экземпляра
}

interface BlocksState {
  canvasBlocks: CanvasBlock[]; // блоки на Canvas (в нужном порядке)
  selectedBlock: CanvasBlock | null; // выбранный блок (объект)
  grabingBlockUUID: string | null;
  hoveredBlockId: string | null;
  selectedGridBlockUUID: string | null;
  selectedGridChildData: {
    cell: BlockItem | null;
    col_idx: number;
    row_idx: number;
  } | null;
}

const initialState: BlocksState = {
  canvasBlocks: [],
  selectedBlock: null,
  hoveredBlockId: null,
  grabingBlockUUID: null,
  selectedGridBlockUUID: null,
  selectedGridChildData: null,
};

const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    addBlock: (
      state,
      action: PayloadAction<{ block: CanvasBlock; index?: number }>
    ) => {
      const { block, index } = action.payload;
      if (
        typeof index === "number" &&
        index >= 0 &&
        index <= state.canvasBlocks.length
      ) {
        state.canvasBlocks.splice(index, 0, block);
      } else {
        state.canvasBlocks.push(block);
      }
    },

    addBetween: (
      state,
      action: PayloadAction<{
        block: CanvasBlock;
        previousBlockId?: string | null;
        nextBlockId?: string | null;
      }>
    ) => {
      const { block, previousBlockId, nextBlockId } = action.payload;

      if (previousBlockId) {
        const prevIdx = state.canvasBlocks.findIndex(
          (b) => b.uuid === previousBlockId
        );
        if (prevIdx !== -1) {
          state.canvasBlocks.splice(prevIdx + 1, 0, block);
          return;
        }
      }

      if (!previousBlockId && nextBlockId) {
        const nextIdx = state.canvasBlocks.findIndex(
          (b) => b.uuid === nextBlockId
        );
        if (nextIdx !== -1) {
          state.canvasBlocks.splice(nextIdx, 0, block);
          return;
        }
      }

      state.canvasBlocks.push(block);
    },

    moveBlock: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      if (
        fromIndex < 0 ||
        fromIndex >= state.canvasBlocks.length ||
        toIndex < 0 ||
        toIndex >= state.canvasBlocks.length ||
        fromIndex === toIndex
      ) {
        return;
      }
      const [removed] = state.canvasBlocks.splice(fromIndex, 1);
      state.canvasBlocks.splice(toIndex, 0, removed);
    },

    moveBetween: (
      state,
      action: PayloadAction<{
        blockId: string;
        previousBlockId?: string | null;
        nextBlockId?: string | null;
      }>
    ) => {
      const { blockId, previousBlockId, nextBlockId } = action.payload;
      const currentIdx = state.canvasBlocks.findIndex(
        (b) => b.uuid === blockId
      );
      if (currentIdx === -1) return;

      const [block] = state.canvasBlocks.splice(currentIdx, 1);

      let insertIdx: number = state.canvasBlocks.length;

      if (!previousBlockId && nextBlockId) {
        const nextIdx = state.canvasBlocks.findIndex(
          (b) => b.uuid === nextBlockId
        );
        insertIdx = nextIdx !== -1 ? nextIdx : 0;
      } else if (previousBlockId) {
        const prevIdx = state.canvasBlocks.findIndex(
          (b) => b.uuid === previousBlockId
        );
        if (prevIdx !== -1) {
          insertIdx = prevIdx + 1;
        }
      }

      if (insertIdx < 0) insertIdx = 0;
      if (insertIdx > state.canvasBlocks.length)
        insertIdx = state.canvasBlocks.length;

      state.canvasBlocks.splice(insertIdx, 0, block);
    },

    updateBlock: (
      state: BlocksState,
      action: PayloadAction<{
        updatedFields: Partial<BlockItem>;
      }>
    ) => {
      const { updatedFields } = action.payload;

      // Берём uuid из selectedBlock
      const uuid = state.selectedBlock?.uuid;
      if (!uuid) return;

      const idx = state.canvasBlocks.findIndex((b) => b.uuid === uuid);

      if (idx !== -1) {
        state.canvasBlocks[idx] = {
          ...state.canvasBlocks[idx],
          ...updatedFields,
          properties: {
            ...state.canvasBlocks[idx].properties,
            ...(updatedFields.properties || {}),
          },
        };
        // update selectedBlock if same block is selected
        if (state.selectedBlock && state.selectedBlock.uuid === uuid) {
          state.selectedBlock = {
            ...state.selectedBlock,
            ...updatedFields,
            properties: {
              ...state.selectedBlock.properties,
              ...(updatedFields.properties || {}),
            },
          };
        }
      }
    },

    removeBlock: (state, action: PayloadAction<string>) => {
      state.canvasBlocks = state.canvasBlocks.filter(
        (b) => b.uuid !== action.payload
      );
      if (state.selectedBlock?.uuid === action.payload) {
        state.selectedBlock = null;
      }
    },

    selectBlock: (state, action: PayloadAction<{ uuid: string } | null>) => {
      if (action.payload === null) {
        state.selectedBlock = null;
        return;
      }

      const { uuid } = action.payload;

      // Выбор верхнеуровневого блока по uuid (не для ячеек)
      const selectedBlock = state.canvasBlocks.findLast(
        (block) => block.uuid === uuid
      );

      state.selectedBlock = selectedBlock ?? null;
    },

    selectBlockFromGrid: (
      state,
      action: PayloadAction<{
        col_idx: number;
        row_idx: number;
      }>
    ) => {
      const { col_idx, row_idx } = action.payload;

      const selectedGridBlock = state.canvasBlocks.findLast(
        (block) => block.uuid === state.selectedGridBlockUUID
      ) as ColumnsBlockItem;

      if (
        !selectedGridBlock ||
        !selectedGridBlock.gridElements ||
        !selectedGridBlock.gridElements[col_idx] ||
        !selectedGridBlock.gridElements[col_idx][row_idx]
      ) {
        return;
      }

      const selectedCell = selectedGridBlock.gridElements[col_idx][row_idx];

      if (selectedCell?.content?.uuid) {
        state.selectedGridChildData = {
          cell: selectedCell.content,
          col_idx,
          row_idx,
        };
        state.selectedBlock = selectedCell.content;
      } else {
        state.selectedGridChildData = null;
      }
    },

    setSelectedColumnUUID: (
      state,
      action: PayloadAction<{ uuid: string | null }>
    ) => {
      state.selectedGridBlockUUID = action.payload.uuid;
    },

    setSelectedColumnChildUUID: (
      state,
      action: PayloadAction<{
        cell: BlockItem | null;
        col_idx: number;
        row_idx: number;
      } | null>
    ) => {
      if (action.payload === null) {
        state.selectedGridChildData = null;
        return;
      }

      const { cell, col_idx, row_idx } = action.payload;
      state.selectedGridChildData = { cell, col_idx, row_idx };
    },

    resetCanvas: (state) => {
      state.canvasBlocks = [];
      state.selectedBlock = null;
    },

    setGrabbingBlock: (state, action: PayloadAction<string | null>) => {
      state.grabingBlockUUID = action.payload;
    },

    setHoveredBlockId: (
      state,
      action: PayloadAction<{ id: string | null }>
    ) => {
      const { id } = action.payload;
      state.hoveredBlockId = id;
    },

    updateCanvasGridBlock: (
      state,
      action: PayloadAction<{
        block: ColumnsBlockItem;
      }>
    ) => {
      const { block } = action.payload;

      const idx = state.canvasBlocks.findLastIndex(
        (b) => b.uuid === state.selectedGridBlockUUID
      );

      if (idx === -1) return;

      const selectedGridBlock = state.canvasBlocks[idx] as ColumnsBlockItem;

      if (!selectedGridBlock || !selectedGridBlock.gridElements) return;

      // Иммутабельная замена всего ColumnsBlockItem
      state.canvasBlocks[idx] = {
        ...selectedGridBlock,
        ...block,
        gridElements: block.gridElements
          ? [...block.gridElements]
          : selectedGridBlock.gridElements,
      } as ColumnsBlockItem;
    },

    updateGridChildBlock: (
      state,
      action: PayloadAction<{
        block: Partial<BlockItem>;
        col_idx?: number;
        row_idx?: number;
      }>
    ) => {
      // Определяем индексы столбца и строки
      const col_idx =
        action.payload.col_idx ?? state.selectedGridChildData?.col_idx;
      const row_idx =
        action.payload.row_idx ?? state.selectedGridChildData?.row_idx;
      if (col_idx === undefined || row_idx === undefined) return;

      // Находим индекс колонки в canvas
      const idx = state.canvasBlocks.findLastIndex(
        (b) => b.uuid === state.selectedGridBlockUUID
      );
      if (idx === -1) return;

      const gridBlock = state.canvasBlocks[idx] as ColumnsBlockItem;
      if (!gridBlock?.gridElements) return;

      // Обновляем нужную ячейку
      const grid = gridBlock.gridElements.map((col, c) =>
        c === col_idx
          ? col.map((cell, r) =>
              r === row_idx
                ? {
                    content: { ...cell?.content, ...action.payload.block },
                  }
                : cell
            )
          : col
      );

      // Сохраняем новый gridElements в блоке
      state.canvasBlocks[idx] = {
        ...gridBlock,
        gridElements: grid,
      } as ColumnsBlockItem;

      // Обновляем выбранный блок если совпадают uuid
      const updatedBlock = grid[col_idx][row_idx]?.content;
      if (
        state.selectedBlock &&
        updatedBlock &&
        (state.selectedBlock as BlockItem).uuid ===
          (updatedBlock as BlockItem).uuid
      ) {
        state.selectedBlock = updatedBlock as CanvasBlock;
      }

      // Обновляем ссылку в selectedGridChildData
      if (
        state.selectedGridChildData &&
        state.selectedGridChildData.col_idx === col_idx &&
        state.selectedGridChildData.row_idx === row_idx
      ) {
        state.selectedGridChildData = {
          cell: updatedBlock as BlockItem,
          col_idx,
          row_idx,
        };
      }
    },
  },
});

export const {
  addBlock,
  addBetween,
  moveBlock,
  moveBetween,
  removeBlock,
  selectBlock,
  resetCanvas,
  setGrabbingBlock,
  updateCanvasGridBlock,
  setHoveredBlockId,
  selectBlockFromGrid,
  setSelectedColumnUUID,
  setSelectedColumnChildUUID,
  updateGridChildBlock,
  updateBlock,
} = blocksSlice.actions;
export default blocksSlice.reducer;
