// store/blocksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlockItem } from "@/types/block";
import { blocks as defaultBlocks } from "@/data/blocks";

// Расширяем BlockItem для блоков на Canvas
export interface CanvasBlock extends BlockItem {
  uuid: string; // уникальный идентификатор экземпляра
}

interface BlocksState {
  availableBlocks: BlockItem[]; // все доступные блоки (константа)
  canvasBlocks: CanvasBlock[]; // блоки на Canvas
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
    // Добавить новый блок на Canvas
    addBlock: (state, action: PayloadAction<CanvasBlock>) => {
      state.canvasBlocks.push(action.payload);
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

export const { addBlock, updateBlock, removeBlock, selectBlock, resetCanvas } =
  blocksSlice.actions;
export default blocksSlice.reducer;
