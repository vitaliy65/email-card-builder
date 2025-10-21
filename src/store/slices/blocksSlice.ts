// store/blocksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BlockItem,
  Column,
  ColumnsBlockItem,
  BlockTypes,
  GeneralBlockProperties,
} from "@/types/block";

// Расширяем BlockItem для блоков на Canvas
export interface CanvasBlock extends BlockItem {
  uuid: string; // уникальный идентификатор экземпляра
}

interface BlocksState {
  canvasBlocks: CanvasBlock[]; // блоки на Canvas (в нужном порядке)
  selectedBlock: CanvasBlock | null; // uuid выбранного блока
  grabingBlockUUID: string | null;
  hoveredBlockId: string | null;
  selectedColumnBlockUUID: string | null;
  selectedColumnChildBlockUUID: string | null;
}

const initialState: BlocksState = {
  canvasBlocks: [],
  selectedBlock: null,
  hoveredBlockId: null,
  grabingBlockUUID: null,
  selectedColumnBlockUUID: null,
  selectedColumnChildBlockUUID: null,
};

const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    // Добавить новый блок на Canvas (в конец по умолчанию или по заданному индексу)
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

    // Добавить блок между существующими по uuid previous и next
    addBetween: (
      state,
      action: PayloadAction<{
        block: CanvasBlock;
        previousBlockId?: string | null;
        nextBlockId?: string | null;
      }>
    ) => {
      const { block, previousBlockId, nextBlockId } = action.payload;

      // Если явно указан previousBlockId, вставь после него
      if (previousBlockId) {
        const prevIdx = state.canvasBlocks.findIndex(
          (b) => b.uuid === previousBlockId
        );
        if (prevIdx !== -1) {
          state.canvasBlocks.splice(prevIdx + 1, 0, block);
          return;
        }
      }

      // Если previousBlockId нет, но есть nextBlockId — вставить перед ним
      if (!previousBlockId && nextBlockId) {
        const nextIdx = state.canvasBlocks.findIndex(
          (b) => b.uuid === nextBlockId
        );
        if (nextIdx !== -1) {
          state.canvasBlocks.splice(nextIdx, 0, block);
          return;
        }
      }

      // Если оба не указаны или не найдены — вставить в конец
      state.canvasBlocks.push(block);
    },

    // Изменить порядок блоков: переместить блок с fromIndex на toIndex
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

    // Переместить блок между другими по uuid previous и next
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

      // Удаляем блок из текущей позиции
      const [block] = state.canvasBlocks.splice(currentIdx, 1);

      // === Логика определения новой позиции ===

      let insertIdx: number = state.canvasBlocks.length; // по умолчанию — в конец

      // 1. Если оба previousBlockId и nextBlockId не заданы — переместить в конец
      // 2. Если previousBlockId не задан (null) и nextBlockId задан — переместить в начало (вставить на 0 перед nextBlockId)
      if (!previousBlockId && nextBlockId) {
        const nextIdx = state.canvasBlocks.findIndex(
          (b) => b.uuid === nextBlockId
        );
        insertIdx = nextIdx !== -1 ? nextIdx : 0;
      }
      // 3. Если previousBlockId задан — вставить после него
      else if (previousBlockId) {
        const prevIdx = state.canvasBlocks.findIndex(
          (b) => b.uuid === previousBlockId
        );
        if (prevIdx !== -1) {
          insertIdx = prevIdx + 1;
        }
      }
      // 4. Если ни previousBlockId, ни nextBlockId не найдены или некорректны — оставить в конце

      // Корректировка, если элемент был выше целевой позиции (после удаления длина уменьшилась)
      if (insertIdx > currentIdx) {
        insertIdx = insertIdx;
      }

      // Ограничиваем диапазон
      if (insertIdx < 0) insertIdx = 0;
      if (insertIdx > state.canvasBlocks.length)
        insertIdx = state.canvasBlocks.length;

      state.canvasBlocks.splice(insertIdx, 0, block);
    },

    // Обновить свойства блока на Canvas
    updateBlockProperties: <T extends GeneralBlockProperties>(
      state: BlocksState,
      action: PayloadAction<{
        uuid: string;
        updatedProperties: Partial<T>;
      }>
    ) => {
      const { uuid, updatedProperties } = action.payload;

      const idx = state.canvasBlocks.findIndex(
        (b) => b.uuid === action.payload.uuid
      );

      if (idx !== -1) {
        state.canvasBlocks[idx] = {
          ...state.canvasBlocks[idx],
          properties: {
            ...state.canvasBlocks[idx].properties,
            ...updatedProperties,
          },
        };
        // Если выбранный блок совпадает по uuid — тоже обновляем
        if (state.selectedBlock && state.selectedBlock.uuid === uuid) {
          state.selectedBlock = {
            ...state.selectedBlock,
            properties: {
              ...state.selectedBlock.properties,
              ...updatedProperties,
            },
          };
        }
      }
    },

    updateBlockField: <T extends BlockItem>(
      state: BlocksState,
      action: PayloadAction<{
        uuid: string;
        updatedField: Partial<T>;
      }>
    ) => {
      const { uuid, updatedField: updatedProperties } = action.payload;

      const idx = state.canvasBlocks.findIndex((b) => b.uuid === uuid);

      if (idx !== -1) {
        state.canvasBlocks[idx] = {
          ...state.canvasBlocks[idx],
          ...updatedProperties,
          // properties остаётся без изменений (для обновления свойств используйте updateBlockProperties)
        };
        // Если выбранный блок совпадает по uuid — тоже обновляем
        if (state.selectedBlock && state.selectedBlock.uuid === uuid) {
          state.selectedBlock = {
            ...state.selectedBlock,
            ...updatedProperties,
            // properties остаётся без изменений
          };
        }
      }
    },

    // Удалить блок с Canvas
    removeBlock: (state, action: PayloadAction<string>) => {
      state.canvasBlocks = state.canvasBlocks.filter(
        (b) => b.uuid !== action.payload
      );
      if (state.selectedBlock?.uuid === action.payload) {
        state.selectedBlock = null;
      }
    },

    // Выбрать блок для редактирования
    selectBlock: (state, action: PayloadAction<string | null>) => {
      const selectedBlock = state.canvasBlocks.findLast(
        (block) => block.uuid === action.payload
      );

      if (!selectedBlock) {
        state.selectedBlock = null;
        return;
      }

      state.selectedBlock = selectedBlock;
    },

    selectBlockFromColumn: (
      state,
      action: PayloadAction<{ columnUUID: string; idx: number }>
    ) => {
      const { columnUUID, idx } = action.payload;

      const selectedBlock = state.canvasBlocks.findLast(
        (block) => block.uuid === columnUUID
      ) as ColumnsBlockItem;

      let column = null;

      if (selectedBlock.columns) {
        column = selectedBlock.columns[idx];
      }

      if (column && column.content) {
        state.selectedBlock = column.content;
      }
    },

    setSelectedColumnUUID: (
      state,
      action: PayloadAction<{ uuid: string | null }>
    ) => {
      state.selectedColumnBlockUUID = action.payload.uuid;
    },

    setSelectedColumnChildUUID: (
      state,
      action: PayloadAction<{ uuid: string | null }>
    ) => {
      state.selectedColumnChildBlockUUID = action.payload.uuid;
    },

    // Сброс Canvas
    resetCanvas: (state) => {
      state.canvasBlocks = [];
      state.selectedBlock = null;
    },

    // Установить uuid блока, который захвачен (перетаскивается)
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

    // Обновляет блок в соответствующей колонке ColumnsBlock
    updateCanvasColumnBlock: (
      state,
      action: PayloadAction<{
        block: Column;
        columnBoxIndex: string;
        columnIndex: string;
      }>
    ) => {
      const { block, columnBoxIndex, columnIndex } = action.payload;

      // Находим блок колонок по UUID
      const columnBlock = state.canvasBlocks.find(
        (b) => b.uuid === columnBoxIndex
      ) as (CanvasBlock & ColumnsBlockItem) | undefined;

      if (!columnBlock || columnBlock.type !== BlockTypes.columns) {
        console.error("Column block not found or not a columns block");
        return;
      }

      // Инициализируем columns если их нет
      if (!columnBlock.columns) {
        columnBlock.columns = [];
      }

      // Обновляем существующую колонку по индексу, вместо добавления новой
      const idx = Number(columnIndex);
      if (!isNaN(idx) && idx >= 0 && idx < columnBlock.columns.length) {
        columnBlock.columns[idx] = {
          ...columnBlock.columns[idx],
          content: block.content,
        };
      } else {
        console.error("Invalid column index:", columnIndex);
      }
    },

    updateColumnChildProperties: <T extends GeneralBlockProperties>(
      state: BlocksState,
      action: PayloadAction<{
        updatedProperties: Partial<T>;
      }>
    ) => {
      const { updatedProperties } = action.payload;

      // Найти блок колонок среди canvasBlocks по выбранному UUID
      const columnBlock = state.canvasBlocks.find(
        (b) => b.uuid === state.selectedColumnBlockUUID
      ) as ColumnsBlockItem | undefined;

      if (!columnBlock || !Array.isArray(columnBlock.columns)) return;

      // Найти индекс и объект колонки с нужным детским uuid
      const idx = columnBlock.columns.findIndex(
        (c) => c.content?.uuid === state.selectedColumnChildBlockUUID
      );

      if (idx === -1) return;

      const colChild = columnBlock.columns[idx];
      if (!colChild || !colChild.content) return;

      // Обновить свойства выбранного дочернего блока в колонке
      columnBlock.columns[idx] = {
        ...colChild,
        content: {
          ...colChild.content,
          properties: {
            ...colChild.content.properties,
            ...updatedProperties,
          },
        },
      };
    },

    // Для обновления любых других полей (кроме properties) дочернего блока в колонке
    updateColumnChildFields: <T extends BlockItem>(
      state: BlocksState,
      action: PayloadAction<{
        updatedField: Partial<T>;
      }>
    ) => {
      const { updatedField } = action.payload;

      // Найти блок колонок среди canvasBlocks по выбранному UUID
      const columnBlock = state.canvasBlocks.find(
        (b) => b.uuid === state.selectedColumnBlockUUID
      ) as ColumnsBlockItem | undefined;

      if (!columnBlock || !Array.isArray(columnBlock.columns)) return;

      // Найти индекс и объект колонки с нужным детским uuid
      const idx = columnBlock.columns.findIndex(
        (c) => c.content?.uuid === state.selectedColumnChildBlockUUID
      );

      if (idx === -1) return;

      const colChild = columnBlock.columns[idx];
      if (!colChild || !colChild.content) return;

      // Обновить поля выбранного дочернего блока в колонке (кроме properties)
      columnBlock.columns[idx] = {
        ...colChild,
        content: {
          ...colChild.content,
          ...updatedField, // properties не трогаем, только другие поля
          properties: colChild.content.properties,
        },
      };
    },

    addBlankColumn: (
      state,
      action: PayloadAction<{ columnBoxUUID: string }>
    ) => {
      const { columnBoxUUID } = action.payload;

      // Находим блок колонок по UUID
      const columnBlock = state.canvasBlocks.find(
        (b) => b.uuid === columnBoxUUID
      ) as (CanvasBlock & ColumnsBlockItem) | undefined;

      columnBlock?.columns?.push({ content: null });
    },
  },
});

export const {
  addBlock,
  addBetween,
  moveBlock,
  moveBetween,
  updateBlockProperties,
  removeBlock,
  selectBlock,
  resetCanvas,
  setGrabbingBlock,
  updateCanvasColumnBlock,
  setHoveredBlockId,
  updateBlockField,
  selectBlockFromColumn,
  setSelectedColumnUUID,
  setSelectedColumnChildUUID,
  updateColumnChildProperties,
  updateColumnChildFields,
} = blocksSlice.actions;
export default blocksSlice.reducer;
