import { BlockItem, ColumnsBlockItem } from "@/types/block";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  updateBlock,
  updateCanvasGridBlock,
  updateGridChildBlock,
} from "@/store/slices/blocksSlice";

export function usePropertiesPanel() {
  const dispatch = useAppDispatch();
  const { selectedBlock, selectedGridChildData } = useAppSelector(
    (s) => s.blocks
  );

  const onChangeGrid = useCallback(
    (newblock: ColumnsBlockItem) => {
      if (!selectedBlock) return null;
      dispatch(
        updateCanvasGridBlock({
          block: newblock,
        })
      );
    },
    [dispatch, selectedBlock?.uuid]
  );

  const onChangeBlock = useCallback(
    (newBlock: Partial<BlockItem>) => {
      if (!selectedBlock) return null;

      if (selectedGridChildData) {
        dispatch(updateGridChildBlock({ block: newBlock }));
        return;
      }

      dispatch(
        updateBlock({
          updatedFields: newBlock,
        })
      );
    },
    [dispatch, selectedBlock?.uuid]
  );

  return {
    selectedBlock,
    onChangeGrid,
    onChangeBlock,
  };
}
