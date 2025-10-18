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
    uuid: "",
    type: BlockTypes.text,
    properties: {
      content: "Click to edit this text",
      backgroundColor: "#ffffff",
      padding: "12px 0",
      margin: "0",
      fontSize: "16px",
      fontWeight: 400,
      color: "#222222",
      borderRadius: "0px",
      borderColor: "#e0e0e0",
      borderWidth: "0px",
      borderStyle: "none",
      width: "100%",
      height: "auto",
      display: "block",
      gap: "0px",
    },
  } as TextBlockItem,
  [BlockTypes.heading]: {
    id: BlockTypes.heading,
    uuid: "",
    type: BlockTypes.heading,
    properties: {
      content: "Click to edit this text",
      backgroundColor: "#ffffff",
      padding: "16px 0",
      margin: "0",
      fontSize: "28px",
      fontWeight: 700,
      color: "#111111",
      borderRadius: "0px",
      borderColor: "#e0e0e0",
      borderWidth: "0px",
      borderStyle: "none",
      width: "100%",
      height: "auto",
      display: "block",
      gap: "0px",
    },
  } as HeadingBlockItem,
  [BlockTypes.button]: {
    id: BlockTypes.button,
    uuid: "",
    type: BlockTypes.button,
    properties: {
      content: "Click Me",
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
      width: "auto",
      height: "auto",
      display: "inline-block",
      gap: "0px",
    },
  } as ButtonBlockItem,
  [BlockTypes.image]: {
    id: BlockTypes.image,
    uuid: "",
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
      width: "100%",
      height: "auto",
      display: "block",
      gap: "0px",
    },
  } as ImageBlockItem,
  [BlockTypes.divider]: {
    id: BlockTypes.divider,
    uuid: "",
    type: BlockTypes.divider,
    properties: {
      backgroundColor: "#e0e0e0",
      padding: "12px 0",
      margin: "0",
      borderRadius: "0px",
      borderColor: "#e0e0e0",
      borderWidth: "1px",
      borderStyle: "solid",
      width: "100%",
      height: "1px",
      display: "block",
      gap: "0px",
    },
  } as BlockItem,
  [BlockTypes.spacer]: {
    id: BlockTypes.spacer,
    uuid: "",
    type: BlockTypes.spacer,
    properties: {
      height: "24px",
      backgroundColor: "#ffffff",
      padding: "0",
      margin: "0",
      borderRadius: "0px",
      borderColor: "#e0e0e0",
      borderWidth: "0px",
      borderStyle: "none",
      width: "100%",
      display: "block",
      gap: "0px",
    },
  } as BlockItem,
  [BlockTypes.columns]: {
    id: BlockTypes.columns,
    uuid: "",
    type: BlockTypes.columns,
    columnsCount: 0,
    columns: [],
    properties: {
      padding: "12px",
      margin: "0",
      borderRadius: "8px",
      borderColor: "#e0e0e0",
      borderWidth: "1px",
      borderStyle: "solid",
      width: "100%",
      height: "auto",
      display: "block",
      gap: "12px",
      zIndex: "10",
      background: "#ffffff",
      boxShadow: "none",
      minWidth: "0",
      minHeight: "0",
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
