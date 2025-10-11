# 📚 Email Builder Hooks

Коллекция переиспользуемых хуков для Email Card Builder, которые инкапсулируют логику управления состоянием и взаимодействием с компонентами.

## 🎯 Созданные хуки

### 1. `useCanvasControls`

Управление настройками canvas (размер, зум, сохранение в localStorage).

```typescript
import { useCanvasControls } from "@/hooks";

const {
  canvasSize,
  zoom,
  setCanvasSize,
  setZoom,
  getCanvasStyles,
  currentSize,
} = useCanvasControls();
```

### 2. `useBlockSelection`

Управление выбором блоков на canvas.

```typescript
import { useBlockSelection } from "@/hooks";

const {
  selectedBlockId,
  selectedBlock,
  selectBlockById,
  deselectBlock,
  selectNextBlock,
  selectPreviousBlock,
} = useBlockSelection();
```

### 3. `useDragAndDrop`

Логика drag-and-drop для добавления блоков.

```typescript
import { useDragAndDrop } from "@/hooks";

const {
  handleDragEnd,
  handleDragStart,
  handleDragEndBlock,
  isDragging,
  getDragInfo,
} = useDragAndDrop();
```

### 4. `useBlockRenderer`

Рендеринг блоков с обработкой ошибок и валидацией.

```typescript
import { useBlockRenderer } from "@/hooks";

const { renderBlock, renderBlocks, validateBlock, getBlockMetadata } =
  useBlockRenderer();
```

### 5. `useBlockProperties`

Управление свойствами блоков с валидацией.

```typescript
import { useBlockProperties } from "@/hooks";

const {
  updateBlockProperty,
  updateBlockProperties,
  getBlockProperties,
  validateBlockProperties,
} = useBlockProperties();
```

### 6. `useExport`

Экспорт canvas в HTML с различными опциями.

```typescript
import { useExport } from "@/hooks";

const { exportToHTML, downloadHTML, copyToClipboard, validateBlocksForExport } =
  useExport();
```

### 7. `useKeyboardShortcuts`

Горячие клавиши для быстрого управления.

```typescript
import { useKeyboardShortcuts } from "@/hooks";

const { addShortcut, removeShortcut, getShortcuts, getShortcutsInfo } =
  useKeyboardShortcuts();
```

## 🔧 Пример интеграции

### Замена логики в BuilderCanvas

```typescript
// Было:
const [canvasSize, setCanvasSize] = useState(CANVAS_SIZES[0].value);
const [zoom, setZoom] = useState(1);

// Стало:
const {
  canvasSize,
  zoom,
  setCanvasSize,
  setZoom,
  getCanvasStyles,
  CANVAS_SIZES,
  ZOOM_LEVELS,
} = useCanvasControls();
```

### Замена логики в DndProvider

```typescript
// Было:
const handleDragEnd = (event: DragEndEvent) => {
  // Сложная логика создания блоков...
};

// Стало:
const { handleDragEnd } = useDragAndDrop();
```

## 🎨 Преимущества

- **Переиспользование**: Логика инкапсулирована и может использоваться в разных компонентах
- **Тестируемость**: Хуки легко тестировать изолированно
- **Читаемость**: Компоненты становятся чище и фокусируются на UI
- **Типизация**: Полная поддержка TypeScript
- **Валидация**: Встроенная валидация данных
- **Обработка ошибок**: Централизованная обработка ошибок

## 🚀 Планы развития

- Добавление хука для управления историей изменений (undo/redo)
- Хук для работы с шаблонами
- Хук для интеграции с внешними API
- Хук для валидации email-совместимости

## 📝 Примечания

Все хуки помечены как `"use client"` и совместимы с Redux Toolkit. Они используют существующие слайсы и не нарушают текущую архитектуру приложения.
