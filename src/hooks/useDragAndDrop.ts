"use client";
import { useCallback } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addBlock,
  setGrabbingBlock,
  CanvasBlock,
} from "@/store/slices/blocksSlice";
import { blocks } from "@/data/blocks";

export const useDragAndDrop = () => {
  const dispatch = useAppDispatch();
  const canvasBlocks = useAppSelector((state) => state.blocks.canvasBlocks);
  const grabingBlockUUID = useAppSelector(
    (state) => state.blocks.grabingBlockUUID
  );

  // Создание нового блока для canvas на основе шаблона
  const createCanvasBlock = useCallback(
    (blockTemplate: (typeof blocks)[0]): CanvasBlock => {
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 8);

      return {
        ...blockTemplate,
        uuid: `${blockTemplate.id}-${timestamp}-${randomSuffix}`,
        properties: {
          backgroundColor: "#ffffff",
          padding: "12px",
          margin: "0",
          // Добавляем контент по умолчанию в зависимости от типа блока
          content: getDefaultContent(blockTemplate.type),
          src:
            blockTemplate.type === "image"
              ? "https://placehold.co/400x200/png?text=Image"
              : undefined,
          alt: blockTemplate.type === "image" ? "Image" : undefined,
          ...blockTemplate.properties,
        },
      };
    },
    []
  );

  // Получение контента по умолчанию для разных типов блоков
  const getDefaultContent = useCallback((blockType: string): string => {
    switch (blockType) {
      case "text":
        return "Double-click to edit this text";
      case "heading":
        return "Double-click to edit this heading";
      case "button":
        return "Click Me";
      case "divider":
        return "";
      case "spacer":
        return "";
      case "image":
        return "";
      case "columns":
        return "";
      default:
        return "";
    }
  }, []);

  // Обработка завершения перетаскивания
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) {
        console.log("Drag ended without valid drop target");
        return;
      }

      // Найти блок по ID в доступных блоках
      const draggedBlock = blocks.find((block) => block.id === active.id);

      if (!draggedBlock) {
        console.warn(
          `Block with id "${active.id}" not found in available blocks`
        );
        return;
      }

      // Проверяем, что элемент сброшен в droppable область
      if (over.id.toString().startsWith("droppable-block-")) {
        try {
          // Создать новый экземпляр блока для canvas
          const newCanvasBlock = createCanvasBlock(draggedBlock);

          // Добавить блок в конец списка
          dispatch(
            addBlock({
              block: newCanvasBlock,
              index: canvasBlocks.length,
            })
          );

          console.log(
            `Added new block: ${draggedBlock.label} (${newCanvasBlock.uuid})`
          );
        } catch (error) {
          console.error("Error creating new block:", error);
        }
      } else {
        console.log(`Drop target "${over.id}" is not a valid droppable area`);
      }
    },
    [dispatch, canvasBlocks.length, createCanvasBlock]
  );

  // Начало перетаскивания блока
  const handleDragStart = useCallback(
    (uuid: string) => {
      dispatch(setGrabbingBlock(uuid));
      console.log(`Started dragging block: ${uuid}`);
    },
    [dispatch]
  );

  // Завершение перетаскивания блока
  const handleDragEndBlock = useCallback(() => {
    // Добавляем небольшую задержку для плавности анимации
    setTimeout(() => {
      dispatch(setGrabbingBlock(null));
      console.log("Finished dragging block");
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
    (blockType: string) => {
      // Здесь можно добавить логику ограничений
      // Например, максимальное количество блоков определенного типа
      const blockCount = canvasBlocks.filter(
        (block) => block.type === blockType
      ).length;

      // Пример ограничения: максимум 10 блоков одного типа
      return blockCount < 10;
    },
    [canvasBlocks]
  );

  // Получение статистики по блокам
  const getBlocksStats = useCallback(() => {
    const stats = blocks.map((template) => {
      const count = canvasBlocks.filter(
        (block) => block.type === template.type
      ).length;
      return {
        type: template.type,
        label: template.label,
        count,
        maxCount: 10, // Можно сделать настраиваемым
        canAdd: count < 10,
      };
    });

    return {
      total: canvasBlocks.length,
      byType: stats,
      maxTotal: 50, // Можно сделать настраиваемым
      canAddMore: canvasBlocks.length < 50,
    };
  }, [canvasBlocks]);

  return {
    // Состояние
    grabingBlockUUID,

    // Обработчики событий
    handleDragEnd,
    handleDragStart,
    handleDragEndBlock,

    // Утилиты
    isDragging,
    getDragInfo,
    canAddBlock,
    getBlocksStats,
    createCanvasBlock,
  };
};
