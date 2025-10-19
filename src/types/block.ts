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
  boxShadow?: string;
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
  objectFit?: React.CSSProperties["objectFit"];
}

// Текстовый блок
export interface TextBlockItem extends BlockItem {
  id: BlockTypes;
  type: BlockTypes;
}

// Заголовок
export interface HeadingBlockItem extends BlockItem {
  id: BlockTypes;
  type: BlockTypes;
}

// Кнопка
export interface ButtonBlockItem extends BlockItem {
  id: BlockTypes;
  type: BlockTypes;
}

// Добавлены эксклюзивные стили для ссылок
export interface LinkProperties extends GeneralBlockProperties {
  textDecoration?: string;
  hoverColor?: string;
  hoverBackgroundColor?: string;
  hoverTextDecoration?: string;
  activeColor?: string;
  activeBackgroundColor?: string;
  visitedColor?: string;
  underline?: boolean;
  cursor?: string;
  transition?: string;
  // можно добавить остальные по необходимости
}

export interface LinkBlockItem extends BlockItem {
  id: BlockTypes;
  type: BlockTypes;
  properties?: LinkProperties;
}

// Изображение
export interface ImageBlockItem extends BlockItem {
  id: BlockTypes;
  type: BlockTypes;
  src?: string;
  alt?: string;
}

// Columns
export interface ColumnsBlockItem extends BlockItem {
  id: BlockTypes;
  type: BlockTypes;
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
