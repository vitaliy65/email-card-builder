"use client";
import React, { useCallback } from "react";
import { CanvasBlock } from "@/store/slices/blocksSlice";
import TextBlock from "@/components/blocks/TextBlock";
import HeadingBlock from "@/components/blocks/HeadingBlock";
import ButtonBlock from "@/components/blocks/ButtonBlock";
import ImageBlock from "@/components/blocks/ImageBlock";
import DividerBlock from "@/components/blocks/DividerBlock";
import SpacerBlock from "@/components/blocks/SpacerBlock";
import ColumnsBlock from "@/components/blocks/ColumnsBlock";
import { BlockTypes } from "@/types/block";

// Карта соответствия типа блока и компонента
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BLOCK_COMPONENTS: Record<string, React.ComponentType<any>> = {
  [BlockTypes.text]: TextBlock,
  [BlockTypes.heading]: HeadingBlock,
  [BlockTypes.button]: ButtonBlock,
  [BlockTypes.image]: ImageBlock,
  [BlockTypes.divider]: DividerBlock,
  [BlockTypes.spacer]: SpacerBlock,
  [BlockTypes.columns]: ColumnsBlock,
};

export const useBlockRenderer = () => {
  // Найти нужный компонент по типу блока
  const getBlockComponent = useCallback((blockType: string) => {
    return BLOCK_COMPONENTS[blockType] || null;
  }, []);

  // Рендер одного блока
  const renderBlock = useCallback(
    (block: CanvasBlock): React.ReactElement | null => {
      if (!block) return null;
      const BlockComponent = getBlockComponent(block.type);
      if (!BlockComponent) {
        console.warn(`Нет компонента для блока типа "${block.type}"`);
        return null;
      }
      // Пробрасываем все пропсы блока как есть, компоненты ожидают проп "props"
      return React.createElement(BlockComponent, { props: block });
    },
    [getBlockComponent]
  );

  // Рендер нескольких блоков
  const renderBlocks = useCallback(
    (blocks: CanvasBlock[]): React.ReactElement[] => {
      if (!blocks || blocks.length === 0) return [];
      return blocks
        .map((block) => {
          const el = renderBlock(block);
          if (!el) return null;
          return React.createElement(
            "div",
            { key: block.uuid, className: "mb-2", id: block.uuid },
            el
          );
        })
        .filter(Boolean) as React.ReactElement[];
    },
    [renderBlock]
  );

  return {
    renderBlock,
    renderBlocks,
    getBlockComponent,
  };
};
