"use client";
import React, { useMemo, useCallback } from "react";
import { CanvasBlock } from "@/store/slices/blocksSlice";

// Импорты компонентов блоков
import TextBlock from "@/components/blocks/TextBlock";
import HeadingBlock from "@/components/blocks/HeadingBlock";
import ButtonBlock from "@/components/blocks/ButtonBlock";
import ImageBlock from "@/components/blocks/ImageBlock";
import DividerBlock from "@/components/blocks/DividerBlock";
import SpacerBlock from "@/components/blocks/SpacerBlock";
import ColumnsBlock from "@/components/blocks/ColumnsBlock";

// Тип для компонента блока
type BlockComponent = React.ComponentType<{ block: CanvasBlock }>;

// Интерфейс для регистрации блоков
interface BlockRegistry {
  [key: string]: BlockComponent;
}

// Функция-обертка для создания компонента блока с правильными пропсами
const createBlockWrapper = (
  Component: React.ComponentType<Record<string, unknown>>
) => {
  const BlockWrapper = ({ block }: { block: CanvasBlock }) => {
    // Извлекаем нужные пропсы из блока в зависимости от типа
    const props: Record<string, unknown> = {};

    if (block.properties) {
      // Базовые пропсы для всех блоков
      props.styles = block.properties;

      // Специфичные пропсы по типу
      switch (block.type) {
        case "text":
        case "heading":
        case "button":
          props.content = block.properties.content;
          break;
        case "image":
          props.src = block.properties.src;
          props.alt = block.properties.alt;
          break;
        case "columns":
          props.columns = block.properties.columns;
          break;
      }
    }

    return React.createElement(Component, props);
  };

  BlockWrapper.displayName = `BlockWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return BlockWrapper;
};

// Реестр компонентов блоков
const BLOCK_REGISTRY: BlockRegistry = {
  text: createBlockWrapper(TextBlock),
  heading: createBlockWrapper(HeadingBlock),
  button: createBlockWrapper(ButtonBlock),
  image: createBlockWrapper(ImageBlock),
  divider: createBlockWrapper(DividerBlock),
  spacer: createBlockWrapper(SpacerBlock),
  columns: createBlockWrapper(ColumnsBlock),
};

export const useBlockRenderer = () => {
  // Получение компонента блока по типу
  const getBlockComponent = useCallback(
    (blockType: string): BlockComponent | null => {
      const component = BLOCK_REGISTRY[blockType];
      if (!component) {
        console.warn(`Компонент для типа блока "${blockType}" не найден`);
        return null;
      }
      return component;
    },
    []
  );

  // Проверка, поддерживается ли тип блока
  const isBlockTypeSupported = useCallback((blockType: string): boolean => {
    return blockType in BLOCK_REGISTRY;
  }, []);

  // Получение списка поддерживаемых типов блоков
  const getSupportedBlockTypes = useCallback((): string[] => {
    return Object.keys(BLOCK_REGISTRY);
  }, []);

  // Рендеринг блока с обработкой ошибок
  const renderErrorBlock = useCallback(
    (block: CanvasBlock, errorMessage: string): React.ReactElement => {
      return React.createElement(
        "div",
        {
          key: block.uuid,
          className: "border-2 border-red-500 bg-red-50 p-4 rounded-md",
          style: {
            backgroundColor: "#fef2f2",
            borderColor: "#ef4444",
            color: "#dc2626",
            padding: "16px",
            borderRadius: "8px",
            fontSize: "14px",
          },
        },
        [
          React.createElement(
            "div",
            {
              key: "error-title",
              className: "font-semibold mb-2",
            },
            "Ошибка рендеринга блока"
          ),
          React.createElement(
            "div",
            {
              key: "error-details",
              className: "text-sm",
            },
            [
              React.createElement("div", { key: "uuid" }, [
                React.createElement("strong", { key: "uuid-label" }, "UUID: "),
                block.uuid,
              ]),
              React.createElement("div", { key: "type" }, [
                React.createElement("strong", { key: "type-label" }, "Тип: "),
                block.type,
              ]),
              React.createElement("div", { key: "error" }, [
                React.createElement(
                  "strong",
                  { key: "error-label" },
                  "Ошибка: "
                ),
                errorMessage,
              ]),
            ]
          ),
        ]
      );
    },
    []
  );

  // Рендеринг одного блока
  const renderBlock = useCallback(
    (block: CanvasBlock): React.ReactElement | null => {
      if (!block) {
        console.warn("Попытка рендеринга пустого блока");
        return null;
      }

      const BlockComponent = getBlockComponent(block.type);

      if (!BlockComponent) {
        console.error(
          `Не удалось найти компонент для блока типа "${block.type}"`
        );
        return renderErrorBlock(
          block,
          `Неподдерживаемый тип блока: ${block.type}`
        );
      }

      try {
        return React.createElement(BlockComponent, { block });
      } catch (error) {
        console.error(`Ошибка рендеринга блока ${block.uuid}:`, error);
        return renderErrorBlock(
          block,
          `Ошибка рендеринга: ${
            error instanceof Error ? error.message : "Неизвестная ошибка"
          }`
        );
      }
    },
    [getBlockComponent, renderErrorBlock]
  );

  // Массовый рендеринг блоков
  const renderBlocks = useCallback(
    (blocks: CanvasBlock[]): React.ReactElement[] => {
      if (!blocks || blocks.length === 0) {
        return [];
      }

      return blocks
        .map((block) => {
          const renderedBlock = renderBlock(block);
          return renderedBlock
            ? React.createElement(
                "div",
                {
                  key: block.uuid,
                  className: "mb-2",
                },
                renderedBlock
              )
            : null;
        })
        .filter(Boolean) as React.ReactElement[];
    },
    [renderBlock]
  );

  // Валидация блока перед рендерингом
  const validateBlock = useCallback(
    (block: CanvasBlock): { isValid: boolean; errors: string[] } => {
      const errors: string[] = [];

      if (!block) {
        errors.push("Блок не определен");
        return { isValid: false, errors };
      }

      if (!block.uuid) {
        errors.push("Отсутствует UUID блока");
      }

      if (!block.type) {
        errors.push("Отсутствует тип блока");
      } else if (!isBlockTypeSupported(block.type)) {
        errors.push(`Неподдерживаемый тип блока: ${block.type}`);
      }

      if (!block.id) {
        errors.push("Отсутствует ID блока");
      }

      return {
        isValid: errors.length === 0,
        errors,
      };
    },
    [isBlockTypeSupported]
  );

  // Получение метаданных блока
  const getBlockMetadata = useCallback(
    (block: CanvasBlock) => {
      const validation = validateBlock(block);

      return {
        uuid: block.uuid,
        type: block.type,
        id: block.id,
        label: block.label,
        description: block.description,
        hasProperties: !!block.properties,
        propertyCount: block.properties
          ? Object.keys(block.properties).length
          : 0,
        isValid: validation.isValid,
        errors: validation.errors,
        component: getBlockComponent(block.type),
        isSupported: isBlockTypeSupported(block.type),
      };
    },
    [validateBlock, getBlockComponent, isBlockTypeSupported]
  );

  // Статистика по типам блоков
  const getBlocksStats = useMemo(() => {
    const stats = getSupportedBlockTypes().map((type) => ({
      type,
      component: BLOCK_REGISTRY[type],
      isRegistered: true,
    }));

    return {
      totalSupported: stats.length,
      supportedTypes: stats,
      registry: BLOCK_REGISTRY,
    };
  }, [getSupportedBlockTypes]);

  return {
    // Основные функции
    renderBlock,
    renderBlocks,
    getBlockComponent,

    // Валидация
    validateBlock,
    isBlockTypeSupported,

    // Метаданные
    getBlockMetadata,
    getSupportedBlockTypes,
    getBlocksStats,

    // Реестр (для расширения)
    BLOCK_REGISTRY,
  };
};
