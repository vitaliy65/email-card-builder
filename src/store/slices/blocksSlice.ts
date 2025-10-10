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
  moveBlock,
  updateBlock,
  removeBlock,
  selectBlock,
  resetCanvas,
} = blocksSlice.actions;
export default blocksSlice.reducer;
