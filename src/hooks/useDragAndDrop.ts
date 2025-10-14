"use client";
import { useCallback } from "react";
import { DragEndEvent, Over } from "@dnd-kit/core";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addBlock,
  setGrabbingBlock,
  CanvasBlock,
  updateCanvasColumnBlock,
} from "@/store/slices/blocksSlice";
import { blockDefaults } from "@/data/blocks";
import { BlockTypes, BlockItem, Column } from "@/types/block";
import { v4 as uuidv4 } from "uuid";

export const useDragAndDrop = () => {
  const dispatch = useAppDispatch();
  const canvasBlocks = useAppSelector((state) => state.blocks.canvasBlocks);
  const grabingBlockUUID = useAppSelector(
    (state) => state.blocks.grabingBlockUUID
  );

  // Создание нового блока для canvas на основе шаблона из blockDefaults
  const createCanvasBlock = useCallback(
    (blockType: BlockTypes): CanvasBlock => {
      const blockTemplate = blockDefaults[blockType] as BlockItem;
      return {
        ...blockTemplate,
        uuid: uuidv4(),
        properties: {
          ...blockTemplate.properties,
        },
      } as CanvasBlock;
    },
    []
  );

  const createColBlock = useCallback((blockType: BlockTypes): Column => {
    const blockTemplate = blockDefaults[blockType] as BlockItem;

    // Создаем Column для вставки в колонку ColumnsBlock
    return {
      id: uuidv4(), // уникальный ID для колонки
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content: (blockTemplate as any).content || null,
      styles: {
        ...blockTemplate.properties,
      },
    } as Column;
  }, []);

  const handleUpdateColumn = useCallback(
    ({
      over,
      draggedBlockType,
    }: {
      over: Over;
      draggedBlockType: BlockTypes;
    }) => {
      if (over.id.toString().startsWith("col_")) {
        try {
          const overId = over.id.toString();
          // Парсим ID: col-{columnBoxIndex}-{columnIndex}
          const parts = overId.split("_");

          if (parts.length < 2) {
            console.error("Invalid column ID format:", overId);
            return;
          }

          const columnBoxIndex = parts[1]; // UUID блока колонок
          const columnIndex = parts.length > 2 ? parts[2] : ""; // ID конкретной колонки

          const updatedColumnBlock = createColBlock(draggedBlockType);

          dispatch(
            updateCanvasColumnBlock({
              block: updatedColumnBlock,
              columnBoxIndex,
              columnIndex,
            })
          );
        } catch (error) {
          const err = error instanceof Error ? error : new Error(String(error));
          console.error(
            "An error occurred while creating a new block: ",
            err.message
          );
        }
      }
    },
    [createColBlock, dispatch]
  );

  // Обработка завершения перетаскивания
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) {
        // Drag ended without valid drop target
        return;
      }

      // Определить тип блока из BlockTypes
      const draggedBlockType = Object.values(BlockTypes).find(
        (type) => type === active.id
      ) as BlockTypes | undefined;

      if (!draggedBlockType) {
        // Block type not found in BlockTypes
        return;
      }

      handleUpdateColumn({ over, draggedBlockType });

      // Проверяем, что элемент сброшен в droppable область
      if (over.id.toString().startsWith("droppable-block-")) {
        try {
          const newCanvasBlock = createCanvasBlock(draggedBlockType);

          dispatch(
            addBlock({
              block: newCanvasBlock,
              index: canvasBlocks.length,
            })
          );
        } catch (error) {
          const err = error instanceof Error ? error : new Error(String(error));
          console.error(
            "An error occurred while creating a new block: ",
            err.message
          );
        }
      }
    },
    [dispatch, canvasBlocks.length, createCanvasBlock, handleUpdateColumn]
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
  };
};
