"use client";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectBlock } from "@/store/slices/blocksSlice";

export const useBlockSelection = () => {
  const dispatch = useAppDispatch();

  // Получаем состояние из Redux
  const selectedBlockId = useAppSelector(
    (state) => state.blocks.selectedBlockId
  );
  const canvasBlocks = useAppSelector((state) => state.blocks.canvasBlocks);

  // Получаем данные выбранного блока
  const selectedBlock = selectedBlockId
    ? canvasBlocks.find((block) => block.uuid === selectedBlockId) || null
    : null;

  // Проверяем, выбран ли блок
  const isBlockSelected = selectedBlockId !== null;
  const hasSelection = isBlockSelected && selectedBlock !== null;

  // Выбрать блок
  const selectBlockById = useCallback(
    (uuid: string) => {
      // Проверяем, существует ли блок с таким uuid
      const blockExists = canvasBlocks.some((block) => block.uuid === uuid);
      if (blockExists) {
        dispatch(selectBlock(uuid));
      } else {
        console.warn(`Блок с uuid "${uuid}" не найден`);
      }
    },
    [dispatch, canvasBlocks]
  );

  // Отменить выбор блока
  const deselectBlock = useCallback(() => {
    dispatch(selectBlock(null));
  }, [dispatch]);

  // Переключить выбор блока (если уже выбран - отменить, если не выбран - выбрать)
  const toggleBlockSelection = useCallback(
    (uuid: string) => {
      if (selectedBlockId === uuid) {
        deselectBlock();
      } else {
        selectBlockById(uuid);
      }
    },
    [selectedBlockId, selectBlockById, deselectBlock]
  );

  // Выбрать следующий блок
  const selectNextBlock = useCallback(() => {
    if (!selectedBlockId || canvasBlocks.length === 0) return;

    const currentIndex = canvasBlocks.findIndex(
      (block) => block.uuid === selectedBlockId
    );
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % canvasBlocks.length;
    selectBlockById(canvasBlocks[nextIndex].uuid);
  }, [selectedBlockId, canvasBlocks, selectBlockById]);

  // Выбрать предыдущий блок
  const selectPreviousBlock = useCallback(() => {
    if (!selectedBlockId || canvasBlocks.length === 0) return;

    const currentIndex = canvasBlocks.findIndex(
      (block) => block.uuid === selectedBlockId
    );
    if (currentIndex === -1) return;

    const prevIndex =
      currentIndex === 0 ? canvasBlocks.length - 1 : currentIndex - 1;
    selectBlockById(canvasBlocks[prevIndex].uuid);
  }, [selectedBlockId, canvasBlocks, selectBlockById]);

  // Проверить, выбран ли конкретный блок
  const isBlockSelectedById = useCallback(
    (uuid: string) => {
      return selectedBlockId === uuid;
    },
    [selectedBlockId]
  );

  // Получить индекс выбранного блока
  const getSelectedBlockIndex = useCallback(() => {
    if (!selectedBlockId) return -1;
    return canvasBlocks.findIndex((block) => block.uuid === selectedBlockId);
  }, [selectedBlockId, canvasBlocks]);

  // Получить общую информацию о выборе
  const getSelectionInfo = useCallback(
    () => ({
      selectedBlockId,
      selectedBlock,
      isBlockSelected,
      hasSelection,
      totalBlocks: canvasBlocks.length,
      selectedIndex: getSelectedBlockIndex(),
      hasNext: getSelectedBlockIndex() < canvasBlocks.length - 1,
      hasPrevious: getSelectedBlockIndex() > 0,
    }),
    [
      selectedBlockId,
      selectedBlock,
      isBlockSelected,
      hasSelection,
      canvasBlocks.length,
      getSelectedBlockIndex,
    ]
  );

  return {
    // Состояние
    selectedBlockId,
    selectedBlock,
    isBlockSelected,
    hasSelection,

    // Действия
    selectBlockById,
    deselectBlock,
    toggleBlockSelection,
    selectNextBlock,
    selectPreviousBlock,

    // Утилиты
    isBlockSelectedById,
    getSelectedBlockIndex,
    getSelectionInfo,
  };
};
