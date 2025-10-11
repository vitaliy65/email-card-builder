"use client";
import { useEffect, useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeBlock, selectBlock } from "@/store/slices/blocksSlice";

// Интерфейс для горячей клавиши
interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  action: () => void;
  description: string;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

// Интерфейс для конфигурации хука
interface UseKeyboardShortcutsOptions {
  enabled?: boolean;
  global?: boolean; // Применить ко всему документу или только к конкретному элементу
  preventDefault?: boolean; // Предотвращать стандартное поведение по умолчанию
  stopPropagation?: boolean; // Останавливать всплытие событий
}

export const useKeyboardShortcuts = (
  options: UseKeyboardShortcutsOptions = {}
) => {
  const dispatch = useAppDispatch();
  const canvasBlocks = useAppSelector((state) => state.blocks.canvasBlocks);
  const selectedBlockId = useAppSelector(
    (state) => state.blocks.selectedBlockId
  );

  const {
    enabled = true,
    global = true,
    preventDefault = true,
    stopPropagation = true,
  } = options;

  const shortcutsRef = useRef<KeyboardShortcut[]>([]);

  // Базовые действия
  const deleteSelectedBlock = useCallback(() => {
    if (selectedBlockId) {
      dispatch(removeBlock(selectedBlockId));
      console.log(`Удален блок: ${selectedBlockId}`);
    }
  }, [dispatch, selectedBlockId]);

  const selectNextBlock = useCallback(() => {
    if (canvasBlocks.length === 0) return;

    const currentIndex = canvasBlocks.findIndex(
      (block) => block.uuid === selectedBlockId
    );
    if (currentIndex === -1) {
      // Если ничего не выбрано, выбрать первый блок
      dispatch(selectBlock(canvasBlocks[0].uuid));
    } else {
      const nextIndex = (currentIndex + 1) % canvasBlocks.length;
      dispatch(selectBlock(canvasBlocks[nextIndex].uuid));
    }
  }, [dispatch, canvasBlocks, selectedBlockId]);

  const selectPreviousBlock = useCallback(() => {
    if (canvasBlocks.length === 0) return;

    const currentIndex = canvasBlocks.findIndex(
      (block) => block.uuid === selectedBlockId
    );
    if (currentIndex === -1) {
      // Если ничего не выбрано, выбрать последний блок
      dispatch(selectBlock(canvasBlocks[canvasBlocks.length - 1].uuid));
    } else {
      const prevIndex =
        currentIndex === 0 ? canvasBlocks.length - 1 : currentIndex - 1;
      dispatch(selectBlock(canvasBlocks[prevIndex].uuid));
    }
  }, [dispatch, canvasBlocks, selectedBlockId]);

  const deselectAll = useCallback(() => {
    dispatch(selectBlock(null));
  }, [dispatch]);

  // Создание списка горячих клавиш
  const createShortcuts = useCallback((): KeyboardShortcut[] => {
    return [
      {
        key: "Delete",
        action: deleteSelectedBlock,
        description: "Удалить выбранный блок",
      },
      {
        key: "Backspace",
        action: deleteSelectedBlock,
        description: "Удалить выбранный блок",
      },
      {
        key: "ArrowDown",
        action: selectNextBlock,
        description: "Выбрать следующий блок",
      },
      {
        key: "ArrowUp",
        action: selectPreviousBlock,
        description: "Выбрать предыдущий блок",
      },
      {
        key: "Escape",
        action: deselectAll,
        description: "Отменить выбор блока",
      },
      {
        key: "a",
        ctrlKey: true,
        action: () => {
          // Ctrl+A - выбрать все блоки (можно расширить в будущем)
          if (canvasBlocks.length > 0) {
            dispatch(selectBlock(canvasBlocks[0].uuid));
          }
        },
        description: "Выбрать первый блок",
      },
      {
        key: "d",
        ctrlKey: true,
        action: deleteSelectedBlock,
        description: "Дублировать блок (пока удалить)",
      },
      {
        key: "s",
        ctrlKey: true,
        action: () => {
          // Ctrl+S - сохранить (можно интегрировать с функцией сохранения)
          console.log("Сохранение...");
        },
        description: "Сохранить проект",
      },
      {
        key: "z",
        ctrlKey: true,
        action: () => {
          // Ctrl+Z - отменить (можно интегрировать с системой истории)
          console.log("Отмена действия...");
        },
        description: "Отменить последнее действие",
      },
      {
        key: "y",
        ctrlKey: true,
        action: () => {
          // Ctrl+Y - повторить (можно интегрировать с системой истории)
          console.log("Повтор действия...");
        },
        description: "Повторить отмененное действие",
      },
      {
        key: "c",
        ctrlKey: true,
        action: () => {
          // Ctrl+C - копировать (можно интегрировать с буфером обмена)
          console.log("Копирование...");
        },
        description: "Копировать выбранный блок",
      },
      {
        key: "v",
        ctrlKey: true,
        action: () => {
          // Ctrl+V - вставить (можно интегрировать с буфером обмена)
          console.log("Вставка...");
        },
        description: "Вставить блок",
      },
    ];
  }, [
    deleteSelectedBlock,
    selectNextBlock,
    selectPreviousBlock,
    deselectAll,
    dispatch,
    canvasBlocks,
  ]);

  // Проверка соответствия нажатых клавиш горячей клавише
  const matchesShortcut = useCallback(
    (event: KeyboardEvent, shortcut: KeyboardShortcut): boolean => {
      return (
        event.key === shortcut.key &&
        !!event.ctrlKey === !!shortcut.ctrlKey &&
        !!event.shiftKey === !!shortcut.shiftKey &&
        !!event.altKey === !!shortcut.altKey &&
        !!event.metaKey === !!shortcut.metaKey
      );
    },
    []
  );

  // Обработчик нажатий клавиш
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Находим соответствующую горячую клавишу
      const matchedShortcut = shortcutsRef.current.find((shortcut) =>
        matchesShortcut(event, shortcut)
      );

      if (matchedShortcut) {
        // Предотвращаем стандартное поведение, если нужно
        if (matchedShortcut.preventDefault !== false && preventDefault) {
          event.preventDefault();
        }

        // Останавливаем всплытие, если нужно
        if (matchedShortcut.stopPropagation !== false && stopPropagation) {
          event.stopPropagation();
        }

        // Выполняем действие
        try {
          matchedShortcut.action();
        } catch (error) {
          console.error("Ошибка при выполнении горячей клавиши:", error);
        }
      }
    },
    [enabled, preventDefault, stopPropagation, matchesShortcut]
  );

  // Регистрация обработчика событий
  useEffect(() => {
    if (!enabled) return;

    // Обновляем список горячих клавиш
    shortcutsRef.current = createShortcuts();

    // Добавляем обработчик событий
    const target: Window | Document = global ? document : window;
    const listener = (event: Event) => handleKeyDown(event as KeyboardEvent);
    target.addEventListener("keydown", listener);

    return () => {
      target.removeEventListener("keydown", listener);
    };
  }, [enabled, global, handleKeyDown, createShortcuts]);

  // Добавление пользовательской горячей клавиши
  const addShortcut = useCallback((shortcut: KeyboardShortcut) => {
    shortcutsRef.current.push(shortcut);
  }, []);

  // Удаление горячей клавиши
  const removeShortcut = useCallback(
    (
      key: string,
      modifiers?: {
        ctrlKey?: boolean;
        shiftKey?: boolean;
        altKey?: boolean;
        metaKey?: boolean;
      }
    ) => {
      shortcutsRef.current = shortcutsRef.current.filter((shortcut) => {
        if (shortcut.key !== key) return true;

        if (modifiers) {
          return !(
            !!shortcut.ctrlKey === !!modifiers.ctrlKey &&
            !!shortcut.shiftKey === !!modifiers.shiftKey &&
            !!shortcut.altKey === !!modifiers.altKey &&
            !!shortcut.metaKey === !!modifiers.metaKey
          );
        }

        return false;
      });
    },
    []
  );

  // Получение списка всех горячих клавиш
  const getShortcuts = useCallback(() => {
    return shortcutsRef.current.map((shortcut) => ({
      key: shortcut.key,
      modifiers: {
        ctrlKey: shortcut.ctrlKey,
        shiftKey: shortcut.shiftKey,
        altKey: shortcut.altKey,
        metaKey: shortcut.metaKey,
      },
      description: shortcut.description,
      keyDisplay: getKeyDisplay(shortcut),
    }));
  }, []);

  // Форматирование отображения горячей клавиши
  const getKeyDisplay = useCallback((shortcut: KeyboardShortcut): string => {
    const parts: string[] = [];

    if (shortcut.ctrlKey) parts.push("Ctrl");
    if (shortcut.shiftKey) parts.push("Shift");
    if (shortcut.altKey) parts.push("Alt");
    if (shortcut.metaKey) parts.push("Cmd");

    parts.push(shortcut.key);

    return parts.join(" + ");
  }, []);

  // Проверка доступности горячей клавиши
  const isShortcutAvailable = useCallback(
    (
      key: string,
      modifiers?: {
        ctrlKey?: boolean;
        shiftKey?: boolean;
        altKey?: boolean;
        metaKey?: boolean;
      }
    ): boolean => {
      return shortcutsRef.current.some((shortcut) => {
        if (shortcut.key !== key) return false;

        if (modifiers) {
          return (
            !!shortcut.ctrlKey === !!modifiers.ctrlKey &&
            !!shortcut.shiftKey === !!modifiers.shiftKey &&
            !!shortcut.altKey === !!modifiers.altKey &&
            !!shortcut.metaKey === !!modifiers.metaKey
          );
        }

        return true;
      });
    },
    []
  );

  // Получение информации о текущем состоянии
  const getShortcutsInfo = useCallback(
    () => ({
      enabled,
      global,
      totalShortcuts: shortcutsRef.current.length,
      shortcuts: getShortcuts(),
      selectedBlockId,
      hasSelectedBlock: selectedBlockId !== null,
      totalBlocks: canvasBlocks.length,
    }),
    [enabled, global, getShortcuts, selectedBlockId, canvasBlocks.length]
  );

  return {
    // Состояние
    enabled,
    shortcuts: getShortcuts(),

    // Управление горячими клавишами
    addShortcut,
    removeShortcut,
    isShortcutAvailable,

    // Информация
    getShortcutsInfo,

    // Внутренние действия (для расширения)
    deleteSelectedBlock,
    selectNextBlock,
    selectPreviousBlock,
    deselectAll,
  };
};
