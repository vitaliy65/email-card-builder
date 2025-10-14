import {
  BlockItem,
  TextBlockItem,
  HeadingBlockItem,
  ButtonBlockItem,
  ImageBlockItem,
  ColumnsBlockItem,
  BlockTypes,
} from "@/types/block";

// Все дефолты блоков в одном массиве/объекте для быстрого поиска по типу
export const blockDefaults: Record<
  BlockTypes,
  | BlockItem
  | TextBlockItem
  | HeadingBlockItem
  | ButtonBlockItem
  | ImageBlockItem
  | ColumnsBlockItem
> = {
  [BlockTypes.text]: {
    id: BlockTypes.text,
    type: BlockTypes.text,
    content: "Double-click to edit this text",
    properties: {
      backgroundColor: "#ffffff",
      padding: "12px 0",
      margin: "0",
      fontSize: "16px",
      fontWeight: 400,
      color: "#222222",
    },
  } as TextBlockItem,
  [BlockTypes.heading]: {
    id: BlockTypes.heading,
    type: BlockTypes.heading,
    content: "Double-click to edit this text",
    properties: {
      backgroundColor: "#ffffff",
      padding: "16px 0",
      margin: "0",
      fontSize: "28px",
      fontWeight: 700,
      color: "#111111",
    },
  } as HeadingBlockItem,
  [BlockTypes.button]: {
    id: BlockTypes.button,
    type: BlockTypes.button,
    content: "Click Me",
    properties: {
      backgroundColor: "#007bff",
      padding: "12px 24px",
      margin: "0",
      fontSize: "18px",
      fontWeight: 600,
      color: "#ffffff",
      borderRadius: "8px",
      borderColor: "#007bff",
      borderWidth: "1px",
      borderStyle: "solid",
    },
  } as ButtonBlockItem,
  [BlockTypes.image]: {
    id: BlockTypes.image,
    type: BlockTypes.image,
    src: "https://placehold.co/400x200/png?text=Image",
    alt: "Image",
    properties: {
      backgroundColor: "#ffffff",
      padding: "12px",
      margin: "0",
      borderRadius: "8px",
      borderColor: "#e0e0e0",
      borderWidth: "1px",
      borderStyle: "solid",
    },
  } as ImageBlockItem,
  [BlockTypes.divider]: {
    id: BlockTypes.divider,
    type: BlockTypes.divider,
    properties: {
      backgroundColor: "#e0e0e0",
      padding: "12px 0",
      margin: "0",
      borderWidth: "1px",
      borderStyle: "solid",
    },
  } as BlockItem,
  [BlockTypes.spacer]: {
    id: BlockTypes.spacer,
    type: BlockTypes.spacer,
    properties: {
      height: "24px",
      backgroundColor: "#ffffff",
      padding: "0",
      margin: "0",
    },
  } as BlockItem,
  [BlockTypes.columns]: {
    id: BlockTypes.columns,
    type: BlockTypes.columns,
    columnsCount: 0,
    columns: [],
    gap: "12px",
    gridProps: {
      display: "grid",
      zIndex: "10",
      gap: "12px",
      background: "gray",
      minHeight: "100px",
    },
    properties: {
      backgroundColor: "#ffffff",
      padding: "12px",
      margin: "0",
      borderRadius: "8px",
      borderColor: "#e0e0e0",
      borderWidth: "1px",
      borderStyle: "solid",
    },
  } as ColumnsBlockItem,
};

// Экспорт каждого дефолта по-отдельности, если это нужно где-то еще
export const TextBlockDefault = blockDefaults[BlockTypes.text] as TextBlockItem;
export const HeadingBlockDefault = blockDefaults[
  BlockTypes.heading
] as HeadingBlockItem;
export const ButtonBlockDefault = blockDefaults[
  BlockTypes.button
] as ButtonBlockItem;
export const ImageBlockDefault = blockDefaults[
  BlockTypes.image
] as ImageBlockItem;
export const DividerBlockDefault = blockDefaults[
  BlockTypes.divider
] as BlockItem;
export const SpacerBlockDefault = blockDefaults[BlockTypes.spacer] as BlockItem;
export const ColumnBlockDefault = blockDefaults[
  BlockTypes.columns
] as ColumnsBlockItem;
