import React from "react";
import { BlockItem, BlockTypes } from "@/types/block";
import { ImageBlockItem, ColumnsBlockItem } from "@/types/block";

// Импорт всех компонентов блоков
import TextBlock from "@/components/blocks/TextBlock";
import HeadingBlock from "@/components/blocks/HeadingBlock";
import ButtonBlock from "@/components/blocks/ButtonBlock";
import ImageBlock from "@/components/blocks/ImageBlock";
import DividerBlock from "@/components/blocks/DividerBlock";
import SpacerBlock from "@/components/blocks/SpacerBlock";
import ColumnsBlock from "@/components/blocks/ColumnsBlock";
import LinkBlock from "@/components/blocks/LinkBlock";

// Типы для каждого компонента блока
type TextBlockComponent = React.ComponentType<{ props?: BlockItem }>;
type HeadingBlockComponent = React.ComponentType<{ props?: BlockItem }>;
type ButtonBlockComponent = React.ComponentType<{ props?: BlockItem }>;
type ImageBlockComponent = React.ComponentType<{ props?: ImageBlockItem }>;
type DividerBlockComponent = React.ComponentType<{ props?: BlockItem }>;
type SpacerBlockComponent = React.ComponentType<{ props?: BlockItem }>;
type ColumnsBlockComponent = React.ComponentType<{ props?: ColumnsBlockItem }>;
type LinkBlockComponent = React.ComponentType<{ props?: BlockItem }>;

// Union тип для всех компонентов блоков
export type BlockComponent =
  | TextBlockComponent
  | HeadingBlockComponent
  | ButtonBlockComponent
  | ImageBlockComponent
  | DividerBlockComponent
  | SpacerBlockComponent
  | ColumnsBlockComponent
  | LinkBlockComponent;

// Record для хранения компонентов блоков
export const blockComponents: Record<BlockTypes, BlockComponent> = {
  [BlockTypes.text]: TextBlock,
  [BlockTypes.heading]: HeadingBlock,
  [BlockTypes.button]: ButtonBlock,
  [BlockTypes.image]: ImageBlock,
  [BlockTypes.divider]: DividerBlock,
  [BlockTypes.spacer]: SpacerBlock,
  [BlockTypes.columns]: ColumnsBlock,
  [BlockTypes.link]: LinkBlock,
};

// Экспорт отдельных компонентов для удобства
export const TextBlockComponent = blockComponents[BlockTypes.text];
export const HeadingBlockComponent = blockComponents[BlockTypes.heading];
export const ButtonBlockComponent = blockComponents[BlockTypes.button];
export const ImageBlockComponent = blockComponents[BlockTypes.image];
export const DividerBlockComponent = blockComponents[BlockTypes.divider];
export const SpacerBlockComponent = blockComponents[BlockTypes.spacer];
export const ColumnsBlockComponent = blockComponents[BlockTypes.columns];
export const LinkBlockComponent = blockComponents[BlockTypes.link];
