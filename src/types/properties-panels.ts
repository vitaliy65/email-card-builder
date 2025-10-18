import {
  BlockItem,
  ButtonBlockItem,
  GeneralBlockProperties,
  ColumnsBlockItem,
  HeadingBlockItem,
  ImageBlockItem,
  TextBlockItem,
} from "@/types/block";

export interface PropertiesBlockProps<
  T extends BlockItem = BlockItem,
  P extends GeneralBlockProperties = GeneralBlockProperties
> {
  block: T;
  onChange: (props: Partial<P>) => void;
  properties: P | undefined;
  handleSaveProperty: (key: string, property: string | number) => void;
}

export interface BasePropertiesPanelProps<
  T extends BlockItem = BlockItem,
  P extends GeneralBlockProperties = GeneralBlockProperties
> {
  block: T;
  onChange: (props: Partial<P>) => void;
}

export type TextPropertiesPanelProps = BasePropertiesPanelProps<TextBlockItem>;
export type HeadingPropertiesPanelProps =
  BasePropertiesPanelProps<HeadingBlockItem>;
export type ButtonPropertiesPanelProps =
  BasePropertiesPanelProps<ButtonBlockItem>;
export type ImagePropertiesPanelProps =
  BasePropertiesPanelProps<ImageBlockItem>;
export type DividerPropertiesPanelProps = BasePropertiesPanelProps<BlockItem>;
export type SpacerPropertiesPanelProps = BasePropertiesPanelProps<BlockItem>;
export type ColumnsPropertiesPanelProps =
  BasePropertiesPanelProps<ColumnsBlockItem>;
