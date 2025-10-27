import { BlockItem, ColumnsBlockItem, ImageBlockItem } from "@/types/block";
import { CSSProperties } from "react";

export interface PropertiesBlockProps<T extends BlockItem = BlockItem> {
  block: T;
  onChange: (props: Partial<T>) => void;
  properties: CSSProperties | undefined;
  handleSaveProperty: (key: string, property: string | number) => void;
}

export interface FieldsBlockProps<T extends BlockItem = BlockItem> {
  block: T;
  onChange: (props: Partial<T>) => void;
  fields: T | undefined;
  handleSaveField: (key: string, field: unknown) => void;
}

export interface BasePanelProps<T extends BlockItem = BlockItem> {
  block: T;
  onChange: (props: Partial<T>) => void;
}

export interface GridBaseFieldPanelProps<T extends BlockItem = BlockItem> {
  block: T;
  onChange: (block: ColumnsBlockItem) => void;
}

export type LinkPropertiesPanelProps = BasePanelProps<BlockItem>;
export type TextPropertiesPanelProps = BasePanelProps<BlockItem>;
export type HeadingPropertiesPanelProps = BasePanelProps<BlockItem>;
export type ButtonPropertiesPanelProps = BasePanelProps<BlockItem>;
export type ImagePropertiesPanelProps = BasePanelProps<ImageBlockItem>;
export type DividerPropertiesPanelProps = BasePanelProps<BlockItem>;
export type SpacerPropertiesPanelProps = BasePanelProps<BlockItem>;
export type ColumnsPropertiesPanelProps =
  GridBaseFieldPanelProps<ColumnsBlockItem>;
