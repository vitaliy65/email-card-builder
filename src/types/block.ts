export enum BlockTypes {
  text = "text",
  heading = "heading",
  button = "button",
  image = "image",
  divider = "divider",
  spacer = "spacer",
  columns = "columns",
}

export interface BlockItem {
  uuid: string;
  id: string;
  type: string;
  properties?: CanvasBlockItem;
}

// Базовый тип для стилей и общих свойств блока
export interface CanvasBlockItem {
  backgroundColor?: string;
  padding?: string | number;
  margin?: string | number;
  borderRadius?: string | number;
  borderColor?: string;
  borderWidth?: string | number;
  borderStyle?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  color?: string;
  width?: string | number;
  height?: string | number;
  display?: string;
  gap?: string | number;
}

// Текстовый блок
export interface TextBlockItem extends BlockItem {
  id: BlockTypes.text;
  type: BlockTypes.text;
  content?: string;
}

// Заголовок
export interface HeadingBlockItem extends BlockItem {
  id: BlockTypes.heading;
  type: BlockTypes.heading;
  content?: string;
}

// Кнопка
export interface ButtonBlockItem extends BlockItem {
  id: BlockTypes.button;
  type: BlockTypes.button;
  content?: string;
}

// Изображение
export interface ImageBlockItem extends BlockItem {
  id: BlockTypes.image;
  type: BlockTypes.image;
  src?: string;
  alt?: string;
}

// Columns
export interface ColumnsBlockItem extends BlockItem {
  id: BlockTypes.columns;
  type: BlockTypes.columns;
  columnsCount?: number;
  columns?: Column[];
  gap: `${number}px`;
  gridProps: GridProperties;
}

export interface Column {
  id: string;
  content?: React.ReactNode;
  styles?: CanvasBlockItem;
}

export interface GridProperties {
  display?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridColumnGap?: string;
  gridRowGap?: string;
  gridAutoFlow?: string;
  justifyItems?: string;
  alignItems?: string;
  justifyContent?: string;
  alignContent?: string;
  placeItems?: string;
  placeContent?: string;
  gap?: string;
  background?: string;
  zIndex?: string | number;
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
  borderRadius?: string | number;
  borderColor?: string;
  borderWidth?: string | number;
  borderStyle?: string;
  padding?: string;
  margin?: string;
  boxShadow?: string;
  // Add more as needed, for now these cover typical grid and some common container props
}
