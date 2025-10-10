// store/blocksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlockItem } from "@/types/block";
import { blocks as defaultBlocks } from "@/data/blocks";

// Расширяем BlockItem для блоков на Canvas
export interface CanvasBlock extends BlockItem {
  uuid: string; // уникальный идентификатор экземпляра
}

interface BlocksState {
  availableBlocks: BlockItem[];
  canvasBlocks: CanvasBlock[]; // блоки на Canvas (в нужном порядке)
  selectedBlockId: string | null; // uuid выбранного блока
}

const initialState: BlocksState = {
  availableBlocks: defaultBlocks,
  canvasBlocks: [],
  selectedBlockId: null,
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
      let index = -1;

      if (previousBlockId) {
        const prevIndex = state.canvasBlocks.findIndex(
          (b) => b.uuid === previousBlockId
        );
        if (prevIndex !== -1) {
          index = prevIndex + 1;
        }
      } else if (nextBlockId) {
        const nextIndex = state.canvasBlocks.findIndex(
          (b) => b.uuid === nextBlockId
        );
        if (nextIndex !== -1) {
          index = nextIndex;
        }
      }

      if (index >= 0 && index <= state.canvasBlocks.length) {
        state.canvasBlocks.splice(index, 0, block);
      } else {
        // если указанные блоки не найдены, добавляем в конец
        state.canvasBlocks.push(block);
      }
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

      const [block] = state.canvasBlocks.splice(currentIdx, 1);

      let newIndex = -1;
      if (previousBlockId) {
        const prevIndex = state.canvasBlocks.findIndex(
          (b) => b.uuid === previousBlockId
        );
        if (prevIndex !== -1) {
          newIndex = prevIndex + 1;
        }
      } else if (nextBlockId) {
        const nextIndex = state.canvasBlocks.findIndex(
          (b) => b.uuid === nextBlockId
        );
        if (nextIndex !== -1) {
          newIndex = nextIndex;
        }
      }

      // Корректируем индекс если удаление блока уменьшило длину массива и он был после точки вставки
      if (newIndex > currentIdx) {
        newIndex = newIndex - 1;
      }

      if (newIndex >= 0 && newIndex <= state.canvasBlocks.length) {
        state.canvasBlocks.splice(newIndex, 0, block);
      } else {
        // если не найдено куда, добавляем в конец
        state.canvasBlocks.push(block);
      }
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
} = blocksSlice.actions;
export default blocksSlice.reducer;
