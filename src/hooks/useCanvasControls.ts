"use client";
import { useState, useCallback, useEffect } from "react";

export interface CanvasSize {
  label: string;
  value: string;
  width: number;
}

export interface ZoomLevel {
  label: string;
  value: number;
}

export const CANVAS_SIZES: CanvasSize[] = [
  { label: "Desktop (600px)", value: "desktop", width: 600 },
  { label: "Mobile (320px)", value: "mobile", width: 320 },
];

export const ZOOM_LEVELS: ZoomLevel[] = [
  { label: "150%", value: 1.5 },
  { label: "125%", value: 1.25 },
  { label: "100%", value: 1 },
  { label: "75%", value: 0.75 },
  { label: "50%", value: 0.5 },
];

interface UseCanvasControlsOptions {
  persistSettings?: boolean;
  storageKey?: string;
}

export const useCanvasControls = (options: UseCanvasControlsOptions = {}) => {
  const {
    persistSettings = true,
    storageKey = "email-builder-canvas-settings",
  } = options;

  // Локальное состояние
  const [canvasSize, setCanvasSizeState] = useState<string>(
    CANVAS_SIZES[0].value
  );
  const [zoom, setZoomState] = useState<number>(1);

  // Загрузка настроек из localStorage при инициализации
  useEffect(() => {
    if (!persistSettings) return;

    try {
      const savedSettings = localStorage.getItem(storageKey);
      if (savedSettings) {
        const { canvasSize: savedCanvasSize, zoom: savedZoom } =
          JSON.parse(savedSettings);

        // Валидация сохраненных значений
        if (CANVAS_SIZES.some((size) => size.value === savedCanvasSize)) {
          setCanvasSizeState(savedCanvasSize);
        }

        if (ZOOM_LEVELS.some((level) => level.value === savedZoom)) {
          setZoomState(savedZoom);
        }
      }
    } catch (error) {
      console.warn("Не удалось загрузить настройки canvas:", error);
    }
  }, [persistSettings, storageKey]);

  // Сохранение настроек в localStorage при изменении
  useEffect(() => {
    if (!persistSettings) return;

    try {
      const settings = { canvasSize, zoom };
      localStorage.setItem(storageKey, JSON.stringify(settings));
    } catch (error) {
      console.warn("Не удалось сохранить настройки canvas:", error);
    }
  }, [canvasSize, zoom, persistSettings, storageKey]);

  // Валидированные сеттеры
  const setCanvasSize = useCallback((newSize: string) => {
    const isValidSize = CANVAS_SIZES.some((size) => size.value === newSize);
    if (isValidSize) {
      setCanvasSizeState(newSize);
    } else {
      console.warn(`Недопустимый размер canvas: ${newSize}`);
    }
  }, []);

  const setZoom = useCallback((newZoom: number) => {
    const isValidZoom = ZOOM_LEVELS.some((level) => level.value === newZoom);
    if (isValidZoom) {
      setZoomState(newZoom);
    } else {
      console.warn(`Недопустимый уровень зума: ${newZoom}`);
    }
  }, []);

  // Получение текущего размера canvas
  const currentSize =
    CANVAS_SIZES.find((size) => size.value === canvasSize) || CANVAS_SIZES[0];

  // Получение текущего уровня зума
  const currentZoom =
    ZOOM_LEVELS.find((level) => level.value === zoom) || ZOOM_LEVELS[2];

  // Сброс к значениям по умолчанию
  const resetToDefaults = useCallback(() => {
    setCanvasSizeState(CANVAS_SIZES[0].value);
    setZoomState(1);
  }, []);

  // Получение стилей для canvas с учетом зума
  const getCanvasStyles = useCallback(
    () => ({
      transform: `scale(${zoom})`,
      transformOrigin: "top center",
      transition: "transform 0.2s",
    }),
    [zoom]
  );

  return {
    // Состояние
    canvasSize,
    zoom,
    currentSize,
    currentZoom,

    // Действия
    setCanvasSize,
    setZoom,
    resetToDefaults,

    // Утилиты
    getCanvasStyles,

    // Константы (для использования в компонентах)
    CANVAS_SIZES,
    ZOOM_LEVELS,
  };
};
