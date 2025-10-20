import {
  BlockItem,
  TextBlockItem,
  HeadingBlockItem,
  ButtonBlockItem,
  ImageBlockItem,
  ColumnsBlockItem,
  BlockTypes,
  LinkBlockItem,
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
  | LinkBlockItem
> = {
  [BlockTypes.text]: {
    id: BlockTypes.text,
    uuid: "",
    type: BlockTypes.text,
    properties: {
      content: "Click to edit this text",
      backgroundColor: "#ffffff",
      padding: "0px 0px 0px 0px",
      margin: "0px 0px 0px 0px",
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
      padding: "0px 0px 0px 0px",
      margin: "0px 0px 0px 0px",
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
    href: "",
    onClick: () => {},
    properties: {
      content: "Click Me",
      backgroundColor: "#007bff",
      padding: "0px 0px 0px 0px",
      margin: "0px 0px 0px 0px",
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
    href: "",
    onClick: () => {},
    src: "https://placehold.co/400x200/png?text=Image",
    alt: "Image",
    properties: {
      backgroundColor: "#ffffff",
      padding: "0px 0px 0px 0px",
      margin: "0px 0px 0px 0px",
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
      padding: "0px 0px 0px 0px",
      margin: "0px 0px 0px 0px",
      borderRadius: "12px",
      borderColor: "#e0e0e0",
      borderWidth: "0px",
      borderStyle: "none",
      width: "100%",
      height: "1px",
      display: "inline-block",
      gap: "0px",
    },
  } as BlockItem,
  [BlockTypes.spacer]: {
    id: BlockTypes.spacer,
    uuid: "",
    type: BlockTypes.spacer,
    properties: {
      height: "32px",
      backgroundColor: "#ffffff",
      padding: "0px 0px 0px 0px",
      margin: "0px 0px 0px 0px",
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
      padding: "0px 0px 0px 0px",
      margin: "0px 0px 0px 0px",
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
  [BlockTypes.link]: {
    id: BlockTypes.link,
    uuid: "",
    type: BlockTypes.link,
    href: "https://example.com",
    properties: {
      content: "This is a test link",
      backgroundColor: "#ffffff",
      padding: "0px 0px 0px 0px",
      margin: "0px 0px 0px 0px",
      fontSize: "14px",
      fontWeight: 600,
      color: "#007bff",
      borderRadius: "0px",
      borderColor: "#000000",
      borderWidth: "0px",
      borderStyle: "none",
      width: "auto",
      height: "auto",
      display: "inline-block",
      gap: "0px",
      // Default link styles from types/block.ts
      textDecoration: "underline",
      underline: true,
      cursor: "pointer",
      transition: "color 0.2s, background 0.2s",
      hoverColor: "#0056b3",
      hoverBackgroundColor: "#eaeaea",
      hoverTextDecoration: "underline",
      activeColor: "#003d80",
      activeBackgroundColor: "#d1d1d1",
      visitedColor: "#551a8b",
    },
  } as LinkBlockItem,
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
export const LinkBlockDefault = blockDefaults[BlockTypes.link] as LinkBlockItem;
