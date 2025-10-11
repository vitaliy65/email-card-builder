// Экспорт всех хуков для удобного импорта

// Основные хуки
export { useBlockManagement } from "./useBlockManagement";

// Новые хуки
export { useCanvasControls } from "./useCanvasControls";
export { useBlockSelection } from "./useBlockSelection";
export { useDragAndDrop } from "./useDragAndDrop";
export { useBlockRenderer } from "./useBlockRenderer";
export { useExport } from "./useExport";
export { useKeyboardShortcuts } from "./useKeyboardShortcuts";

// Экспорт типов
export type { CanvasSize, ZoomLevel } from "./useCanvasControls";
