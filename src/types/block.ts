export interface BlockItem {
  id: string;
  type: string;
  icon: React.FC;
  label: string;
  description: string;
  properties?: CanvasBlockItem;
}

export interface CanvasBlockItem {
  columns?: number;
  content?: string; // Добавьте это поле для текстового контента
  src?: string; // Для изображений
  alt?: string; // Для изображений
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
