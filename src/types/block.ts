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
  properties?: GeneralBlockProperties;
}

// Базовый тип для стилей и общих свойств блока
export interface GeneralBlockProperties {
  // general
  content?: string;
  background?: string;
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
  textAlign?: CanvasTextAlign;
  zIndex?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
  // выравнивание объектов внутри (flex/grid)
  alignItems?: string;
  justifyContent?: string;
}

// Текстовый блок
export interface TextBlockItem extends BlockItem {
  id: BlockTypes.text;
  type: BlockTypes.text;
}

// Заголовок
export interface HeadingBlockItem extends BlockItem {
  id: BlockTypes.heading;
  type: BlockTypes.heading;
}

// Кнопка
export interface ButtonBlockItem extends BlockItem {
  id: BlockTypes.button;
  type: BlockTypes.button;
}

// Основные стили для изображения
export interface ImageStyleProperties {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  boxShadow?: string;
  borderColor?: string;
  borderWidth?: string | number;
  borderStyle?: string;
  display?: string;
  margin?: string | number;
  padding?: string | number;
  backgroundColor?: string;
}

// Изображение
export interface ImageBlockItem extends BlockItem {
  id: BlockTypes.image;
  type: BlockTypes.image;
  src?: string;
  alt?: string;
  style?: ImageStyleProperties;
}

// Columns
export interface ColumnsBlockItem extends BlockItem {
  id: BlockTypes.columns;
  type: BlockTypes.columns;
  columnsCount?: number;
  columns?: Column[];
  properties?: GridProperties;
}

export interface Column {
  id: string;
  content?: BlockItem | null;
}

// GridProperties will only have properties specific to grid and not those in CanvasBlockItem
export interface GridProperties extends GeneralBlockProperties {
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridColumnGap?: string;
  gridRowGap?: string;
  gridAutoFlow?: string;
  justifyItems?: string;
  alignContent?: string;
  placeItems?: string;
  placeContent?: string;
}
