export enum BlockTypes {
  text = "text",
  heading = "heading",
  button = "button",
  image = "image",
  divider = "divider",
  spacer = "spacer",
  columns = "columns",
  link = "link",
}

export interface BlockItem {
  uuid: string;
  id: BlockTypes;
  type: BlockTypes;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => void;
  href?: string;
  properties?: React.CSSProperties;
}

// Изображение
export interface ImageBlockItem extends BlockItem {
  src?: string;
  alt?: string;
}

// Columns
export interface ColumnsBlockItem extends BlockItem {
  columnsCount?: number;
  rowsCount?: number;
  gridElements?: GridElement[][];
}

export interface GridElement {
  content?: BlockItem | null;
}
