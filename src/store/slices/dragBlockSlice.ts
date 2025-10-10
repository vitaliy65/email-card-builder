import { BlockItem } from "@/types/block";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DragBlockState {
  draggingBlockId: string | null;
  blockInfo: BlockItem | null;
}

const initialState: DragBlockState = {
  draggingBlockId: null,
  blockInfo: null,
};

const dragBlockSlice = createSlice({
  name: "dragBlock",
  initialState,
  reducers: {
    setDraggingBlockId: (state, action: PayloadAction<string | null>) => {
      state.draggingBlockId = action.payload;
    },
    setBlockInfo: (state, action: PayloadAction<BlockItem | null>) => {
      state.blockInfo = action.payload;
    },
  },
});

export const { setDraggingBlockId, setBlockInfo } = dragBlockSlice.actions;
export default dragBlockSlice.reducer;
