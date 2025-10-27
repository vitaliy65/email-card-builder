"use client";
import { useCallback } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addBlock,
  setGrabbingBlock,
  updateGridChildBlock,
} from "@/store/slices/blocksSlice";
import { blockDefaults } from "@/data/blocks";
import { BlockTypes, BlockItem } from "@/types/block";
import { v4 as uuidv4 } from "uuid";
import { createCanvasBlock } from "@/lib/utils";

/**
 * Создать новый объект BlockItem для вставки в колонку/ячейку
 */
export function createColumnCellBlock(blockType: BlockTypes): BlockItem {
  const base = blockDefaults[blockType] as BlockItem;
  return {
    ...base,
    uuid: uuidv4(),
    properties: { ...base.properties },
  };
}

/**
 * Хук dnd для работы с canvas и ColumnsBlock
 */
export const useDragAndDrop = () => {
  const dispatch = useAppDispatch();
  const canvasBlocks = useAppSelector((state) => state.blocks.canvasBlocks);
  const grabingBlockUUID = useAppSelector(
    (state) => state.blocks.grabingBlockUUID
  );

  /**
   * Обработка для вставки блока в ячейку (cell_) либо обычный droppable-block-*
   * Совместимо с вашим ColumnsBlock/ColumnBlockCell
   */
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;

      // draggedBlockType: определяем тип блока
      const draggedBlockType = Object.values(BlockTypes).find(
        (type) => type === active.id
      ) as BlockTypes | undefined;
      if (!draggedBlockType) return;

      const overId = over.id.toString();

      // Сброс на обычный блок: добавляем на канвас
      if (overId.startsWith("droppable-block-")) {
        const newCanvasBlock = createCanvasBlock(draggedBlockType);
        dispatch(
          addBlock({
            block: newCanvasBlock,
            index: canvasBlocks.length,
          })
        );
        return;
      }

      // Сброс в ячейку таблицы-columns: id формата "cell_{uuid}_{rowIdx}_{colIdx}"
      if (overId.startsWith("cell_")) {
        const parts = overId.split("_");
        const columnUUID = parts[1];
        const row_idx = parseInt(parts[2], 10);
        const col_idx = parseInt(parts[3], 10);

        // Создать новый блок и отдать в свой updateColumnChildFields экшен
        const newBlock = createColumnCellBlock(draggedBlockType);

        dispatch(updateGridChildBlock({ block: newBlock, col_idx, row_idx }));
        return;
      }

      // Возможны другие типы droppable — добавить здесь
    },
    [dispatch, canvasBlocks.length]
  );

  // Начало перетаскивания блока
  const handleDragStart = useCallback(
    (uuid: string) => {
      dispatch(setGrabbingBlock(uuid));
    },
    [dispatch]
  );

  // Завершение перетаскивания блока
  const handleDragEndBlock = useCallback(() => {
    setTimeout(() => {
      dispatch(setGrabbingBlock(null));
    }, 150);
  }, [dispatch]);

  // Проверка, перетаскивается ли блок
  const isDragging = useCallback(
    (uuid?: string) => {
      if (!uuid) return grabingBlockUUID !== null;
      return grabingBlockUUID === uuid;
    },
    [grabingBlockUUID]
  );

  // Получение информации о текущем перетаскивании
  const getDragInfo = useCallback(
    () => ({
      isDragging: grabingBlockUUID !== null,
      draggedBlockUUID: grabingBlockUUID,
      draggedBlock: grabingBlockUUID
        ? canvasBlocks.find((block) => block.uuid === grabingBlockUUID) || null
        : null,
    }),
    [grabingBlockUUID, canvasBlocks]
  );

  // Валидация возможности добавления блока
  const canAddBlock = useCallback(
    (blockType: BlockTypes) => {
      const blockCount = canvasBlocks.filter(
        (block) => block.type === blockType
      ).length;
      return blockCount < 10;
    },
    [canvasBlocks]
  );

  return {
    grabingBlockUUID,
    handleDragEnd,
    handleDragStart,
    handleDragEndBlock,
    isDragging,
    getDragInfo,
    canAddBlock,
    createCanvasBlock,
    createColumnCellBlock,
  };
};
