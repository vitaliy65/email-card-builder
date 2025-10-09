import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DragBlockState {
  draggingBlockId: string | null;
}

const initialState: DragBlockState = {
  draggingBlockId: null,
};

const dragBlockSlice = createSlice({
  name: "dragBlock",
  initialState,
  reducers: {
    setDraggingBlockId: (state, action: PayloadAction<string | null>) => {
      state.draggingBlockId = action.payload;
    },
  },
});

export const { setDraggingBlockId } = dragBlockSlice.actions;
export default dragBlockSlice.reducer;
