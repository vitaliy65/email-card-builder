import {
  BlockItem,
  ButtonBlockItem,
  GeneralBlockProperties,
  ColumnsBlockItem,
  HeadingBlockItem,
  ImageBlockItem,
  TextBlockItem,
  LinkBlockItem,
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

export interface FieldsBlockProps<T extends BlockItem = BlockItem> {
  block: T;
  onChangeBlockField: (props: Partial<T>) => void;
  fields: T | undefined;
  handleSaveField: (key: string, field: unknown) => void;
}

export interface BasePropertiesPanelProps<
  T extends BlockItem = BlockItem,
  P extends GeneralBlockProperties = GeneralBlockProperties
> {
  block: T;
  onChange: (props: Partial<P>) => void;
}

export interface BaseFieldPanelProps<
  T extends BlockItem = BlockItem,
  P extends GeneralBlockProperties = GeneralBlockProperties
> {
  block: T;
  onChange: (props: Partial<P>) => void;
  onChangeBlockField: (props: Partial<T>) => void;
}

export type LinkPropertiesPanelProps = BaseFieldPanelProps<LinkBlockItem>;
export type TextPropertiesPanelProps = BasePropertiesPanelProps<TextBlockItem>;
export type HeadingPropertiesPanelProps =
  BasePropertiesPanelProps<HeadingBlockItem>;
export type ButtonPropertiesPanelProps = BaseFieldPanelProps<ButtonBlockItem>;
export type ImagePropertiesPanelProps = BaseFieldPanelProps<ImageBlockItem>;
export type DividerPropertiesPanelProps = BasePropertiesPanelProps<BlockItem>;
export type SpacerPropertiesPanelProps = BasePropertiesPanelProps<BlockItem>;
export type ColumnsPropertiesPanelProps = BaseFieldPanelProps<ColumnsBlockItem>;
