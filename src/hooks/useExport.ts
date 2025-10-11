"use client";
import { useCallback, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { CanvasBlock } from "@/store/slices/blocksSlice";

// Интерфейс для опций экспорта
interface ExportOptions {
  includeInlineStyles?: boolean;
  includeDoctype?: boolean;
  includeHtmlTag?: boolean;
  includeHead?: boolean;
  addContainerWrapper?: boolean;
  containerWidth?: string;
  containerBackground?: string;
  minify?: boolean;
}

// Интерфейс для результата экспорта
interface ExportResult {
  success: boolean;
  html?: string;
  error?: string;
  warnings?: string[];
  metadata?: {
    blockCount: number;
    estimatedSize: number;
    exportTime: number;
  };
}

// Интерфейс для валидации перед экспортом
interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const useExport = () => {
  const canvasBlocks = useAppSelector((state) => state.blocks.canvasBlocks);
  const [isExporting, setIsExporting] = useState(false);
  const [lastExportResult, setLastExportResult] = useState<ExportResult | null>(
    null
  );

  // Валидация блоков перед экспортом
  const validateBlocksForExport = useCallback((): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (canvasBlocks.length === 0) {
      errors.push("Нет блоков для экспорта");
      return { isValid: false, errors, warnings };
    }

    canvasBlocks.forEach((block, index) => {
      // Проверяем обязательные поля
      if (!block.uuid) {
        errors.push(`Блок ${index + 1}: отсутствует UUID`);
      }

      if (!block.type) {
        errors.push(`Блок ${index + 1}: отсутствует тип`);
      }

      if (!block.properties) {
        warnings.push(`Блок ${index + 1}: отсутствуют свойства`);
      }

      // Специфичные проверки по типам блоков
      switch (block.type) {
        case "text":
        case "heading":
          if (
            !block.properties?.content ||
            block.properties.content.trim() === ""
          ) {
            warnings.push(`Блок ${index + 1} (${block.type}): пустой контент`);
          }
          break;

        case "image":
          if (!block.properties?.src) {
            errors.push(`Блок ${index + 1} (image): отсутствует src`);
          }
          if (!block.properties?.alt) {
            warnings.push(`Блок ${index + 1} (image): отсутствует alt текст`);
          }
          break;

        case "button":
          if (
            !block.properties?.content ||
            block.properties.content.trim() === ""
          ) {
            warnings.push(`Блок ${index + 1} (button): пустой текст кнопки`);
          }
          break;
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }, [canvasBlocks]);

  // Генерация CSS стилей для блока
  const generateBlockStyles = useCallback((block: CanvasBlock): string => {
    if (!block.properties) return "";

    const styles: string[] = [];
    const props = block.properties;

    // Базовые стили
    if (props.backgroundColor)
      styles.push(`background-color: ${props.backgroundColor}`);
    if (props.color) styles.push(`color: ${props.color}`);
    if (props.padding) styles.push(`padding: ${props.padding}`);
    if (props.margin) styles.push(`margin: ${props.margin}`);
    if (props.borderRadius) styles.push(`border-radius: ${props.borderRadius}`);
    if (props.borderColor) styles.push(`border-color: ${props.borderColor}`);
    if (props.borderWidth) styles.push(`border-width: ${props.borderWidth}`);
    if (props.borderStyle) styles.push(`border-style: ${props.borderStyle}`);
    if (props.fontSize) styles.push(`font-size: ${props.fontSize}`);
    if (props.fontWeight) styles.push(`font-weight: ${props.fontWeight}`);
    if (props.width) styles.push(`width: ${props.width}`);
    if (props.height) styles.push(`height: ${props.height}`);
    if (props.display) styles.push(`display: ${props.display}`);
    if (props.gap) styles.push(`gap: ${props.gap}`);

    return styles.join("; ");
  }, []);

  // Генерация HTML для блока
  const generateBlockHTML = useCallback(
    (block: CanvasBlock): string => {
      if (!block) return "";

      const styles = generateBlockStyles(block);
      const styleAttr = styles ? ` style="${styles}"` : "";

      switch (block.type) {
        case "text":
          return `<p${styleAttr}>${block.properties?.content || ""}</p>`;

        case "heading":
          return `<h2${styleAttr}>${block.properties?.content || ""}</h2>`;

        case "button":
          return `<button${styleAttr}>${
            block.properties?.content || "Button"
          }</button>`;

        case "image":
          const src = block.properties?.src || "";
          const alt = block.properties?.alt || "Image";
          return `<div${styleAttr}><img src="${src}" alt="${alt}" style="max-width: 100%; height: auto;" /></div>`;

        case "divider":
          return `<hr${styleAttr} />`;

        case "spacer":
          return `<div${styleAttr}></div>`;

        case "columns":
          // Простая реализация для колонок - в реальном проекте может быть сложнее
          const columns = block.properties?.columns || 2;
          const columnWidth = Math.floor(100 / columns);
          let columnsHTML = `<div${styleAttr}>`;

          for (let i = 0; i < columns; i++) {
            columnsHTML += `<div style="width: ${columnWidth}%; display: inline-block; vertical-align: top;">Column ${
              i + 1
            }</div>`;
          }

          columnsHTML += "</div>";
          return columnsHTML;

        default:
          console.warn(`Неизвестный тип блока: ${block.type}`);
          return `<div${styleAttr}>Unknown block type: ${block.type}</div>`;
      }
    },
    [generateBlockStyles]
  );

  // Основная функция экспорта
  const exportToHTML = useCallback(
    async (options: ExportOptions = {}): Promise<ExportResult> => {
      const startTime = Date.now();
      setIsExporting(true);

      try {
        // Валидация
        const validation = validateBlocksForExport();
        if (!validation.isValid) {
          setLastExportResult({
            success: false,
            error: `Ошибки валидации: ${validation.errors.join(", ")}`,
            warnings: validation.warnings,
          });
          return {
            success: false,
            error: `Ошибки валидации: ${validation.errors.join(", ")}`,
            warnings: validation.warnings,
          };
        }

        // Настройки по умолчанию
        const {
          includeInlineStyles = true,
          includeDoctype = true,
          includeHtmlTag = true,
          includeHead = true,
          addContainerWrapper = true,
          containerWidth = "600px",
          containerBackground = "#ffffff",
          minify = false,
        } = options;

        let html = "";

        // DOCTYPE
        if (includeDoctype) {
          html += "<!DOCTYPE html>\n";
        }

        // HTML тег
        if (includeHtmlTag) {
          html += '<html lang="ru">\n';
        }

        // Head секция
        if (includeHead) {
          html += "<head>\n";
          html += '  <meta charset="UTF-8">\n';
          html +=
            '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
          html += "  <title>Email Template</title>\n";

          // Базовые стили для email
          html += "  <style>\n";
          html +=
            "    body { margin: 0; padding: 0; font-family: Arial, sans-serif; }\n";
          html += "    table { border-collapse: collapse; }\n";
          html +=
            "    img { border: 0; outline: none; text-decoration: none; }\n";
          html += "  </style>\n";
          html += "</head>\n";
        }

        // Body
        html += "<body>\n";

        // Контейнер-обертка
        if (addContainerWrapper) {
          html += `  <div style="width: ${containerWidth}; margin: 0 auto; background-color: ${containerBackground}; padding: 20px;">\n`;
        }

        // Генерация блоков
        canvasBlocks.forEach((block) => {
          const blockHTML = generateBlockHTML(block);
          if (addContainerWrapper) {
            html += `    ${blockHTML}\n`;
          } else {
            html += `  ${blockHTML}\n`;
          }
        });

        // Закрытие контейнера
        if (addContainerWrapper) {
          html += "  </div>\n";
        }

        // Закрытие body и html
        html += "</body>\n";
        if (includeHtmlTag) {
          html += "</html>\n";
        }

        // Минификация (простая)
        if (minify) {
          html = html.replace(/\s+/g, " ").trim();
        }

        const exportTime = Date.now() - startTime;
        const result: ExportResult = {
          success: true,
          html,
          warnings: validation.warnings,
          metadata: {
            blockCount: canvasBlocks.length,
            estimatedSize: new Blob([html]).size,
            exportTime,
          },
        };

        setLastExportResult(result);
        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Неизвестная ошибка экспорта";
        const result: ExportResult = {
          success: false,
          error: errorMessage,
        };

        setLastExportResult(result);
        return result;
      } finally {
        setIsExporting(false);
      }
    },
    [canvasBlocks, validateBlocksForExport, generateBlockHTML]
  );

  // Экспорт с загрузкой файла
  const downloadHTML = useCallback(
    async (
      filename: string = "email-template.html",
      options?: ExportOptions
    ) => {
      const result = await exportToHTML(options);

      if (result.success && result.html) {
        const blob = new Blob([result.html], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        console.log(`Файл ${filename} успешно скачан`);
        return { success: true };
      } else {
        console.error("Ошибка при скачивании файла:", result.error);
        return { success: false, error: result.error };
      }
    },
    [exportToHTML]
  );

  // Копирование в буфер обмена
  const copyToClipboard = useCallback(
    async (options?: ExportOptions) => {
      const result = await exportToHTML(options);

      if (result.success && result.html) {
        try {
          await navigator.clipboard.writeText(result.html);
          console.log("HTML скопирован в буфер обмена");
          return { success: true };
        } catch (error) {
          console.error("Ошибка при копировании в буфер обмена:", error);
          return {
            success: false,
            error: "Не удалось скопировать в буфер обмена",
          };
        }
      } else {
        return { success: false, error: result.error };
      }
    },
    [exportToHTML]
  );

  // Получение превью HTML (первые N символов)
  const getHTMLPreview = useCallback(
    (maxLength: number = 500) => {
      if (canvasBlocks.length === 0) {
        return "Нет блоков для превью";
      }

      try {
        let preview = "";
        canvasBlocks.slice(0, 3).forEach((block) => {
          preview += generateBlockHTML(block);
        });

        if (preview.length > maxLength) {
          preview = preview.substring(0, maxLength) + "...";
        }

        return preview;
      } catch (error) {
        return "Ошибка при генерации превью";
      }
    },
    [canvasBlocks, generateBlockHTML]
  );

  return {
    // Состояние
    isExporting,
    lastExportResult,

    // Основные функции
    exportToHTML,
    downloadHTML,
    copyToClipboard,

    // Утилиты
    validateBlocksForExport,
    getHTMLPreview,

    // Метаданные
    blockCount: canvasBlocks.length,
    hasBlocks: canvasBlocks.length > 0,
  };
};
