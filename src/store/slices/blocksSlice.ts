// store/blocksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlockItem, ColumnsBlockItem } from "@/types/block";

// Расширяем BlockItem для блоков на Canvas
export interface CanvasBlock extends BlockItem {
  uuid: string; // уникальный идентификатор экземпляра
}

interface BlocksState {
  canvasBlocks: CanvasBlock[]; // блоки на Canvas (в нужном порядке)
  selectedBlockId: string | null; // uuid выбранного блока
  grabingBlockUUID: string | null;
  hoveredBlockId: string | null;
}

const initialState: BlocksState = {
  canvasBlocks: [],
  selectedBlockId: null,
  hoveredBlockId: null,
  grabingBlockUUID: null,
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
    updateBlock: (
      state,
      action: PayloadAction<{
        uuid: string;
        properties: Partial<BlockItem["properties"]>;
      }>
    ) => {
      const block = state.canvasBlocks.find(
        (b) => b.uuid === action.payload.uuid
      );
      if (block) {
        block.properties = {
          ...block.properties,
          ...action.payload.properties,
        };
      }
    },

    // Удалить блок с Canvas
    removeBlock: (state, action: PayloadAction<string>) => {
      state.canvasBlocks = state.canvasBlocks.filter(
        (b) => b.uuid !== action.payload
      );
      if (state.selectedBlockId === action.payload) {
        state.selectedBlockId = null;
      }
    },

    // Выбрать блок для редактирования
    selectBlock: (state, action: PayloadAction<string | null>) => {
      state.selectedBlockId = action.payload;
    },

    // Сброс Canvas
    resetCanvas: (state) => {
      state.canvasBlocks = [];
      state.selectedBlockId = null;
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

    updateCanvasColumnBlock: (
      state,
      action: PayloadAction<{ block: CanvasBlock; columnIndex?: string }>
    ) => {
      const { block, columnIndex } = action.payload;

      const columnBlock = state.canvasBlocks.find(
        (block) => block.uuid === state.hoveredBlockId
      ) as ColumnsBlockItem;

      // columnBlock.columns
    },
  },
});

export const {
  addBlock,
  addBetween,
  moveBlock,
  moveBetween,
  updateBlock,
  removeBlock,
  selectBlock,
  resetCanvas,
  setGrabbingBlock,
  updateCanvasColumnBlock,
  setHoveredBlockId,
} = blocksSlice.actions;
export default blocksSlice.reducer;
