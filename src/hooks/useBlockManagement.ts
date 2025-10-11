import { useAppDispatch } from "@/store/hooks";
import {
  addBlock,
  CanvasBlock,
  removeBlock,
  updateBlock,
} from "@/store/slices/blocksSlice";
import { CanvasBlockItem } from "@/types/block";
import { useCallback } from "react";

export const useBlockManagement = () => {
  const dispatch = useAppDispatch();

  const addCanvasBlock = useCallback(
    (block: CanvasBlock, index?: number) => {
      dispatch(addBlock({ block, index }));
    },
    [dispatch]
  );

  const updateCanvasBlock = useCallback(
    (uuid: string, properties: Partial<CanvasBlockItem>) => {
      dispatch(updateBlock({ uuid, properties }));
    },
    [dispatch]
  );

  const deleteCanvasBlock = useCallback(
    (uuid: string) => {
      dispatch(removeBlock(uuid));
    },
    [dispatch]
  );

  const selectCanvasBlock = useCallback(
    (uuid: string, properties: Partial<CanvasBlockItem>) => {
      dispatch(updateBlock({ uuid, properties }));
    },
    [dispatch]
  );

  return {
    addCanvasBlock,
    updateCanvasBlock,
    deleteCanvasBlock,
    selectCanvasBlock,
  };
};
