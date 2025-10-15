"use client";
import { Button } from "@/components/ui/button";
import { Download, Save, Eye, Code, Settings } from "lucide-react";
import { useState } from "react";

/**
 * Пример использования хуков в Header
 * Показывает интеграцию хуков экспорта и горячих клавиш
 */
export function HeaderWithHooks() {
  const [isExporting, setIsExporting] = useState(false);

  // Обработчики для кнопок
  const handleExportHTML = async () => {
    setIsExporting(true);
    try {
      // const result = await downloadHTML("email-template.html", {
      //   includeDoctype: true,
      //   includeHtmlTag: true,
      //   includeHead: true,
      //   addContainerWrapper: true,
      //   containerWidth: "600px",
      //   containerBackground: "#ffffff",
      //   minify: false,
      // });
      // if (result.success) {
      //   console.log("HTML успешно экспортирован");
      // } else {
      //   console.error("Ошибка экспорта:", result.error);
      // }
    } catch (error) {
      console.error("Ошибка при экспорте:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePreview = async () => {
    try {
      // const result = await exportToHTML({
      //   includeDoctype: false,
      //   includeHtmlTag: false,
      //   includeHead: false,
      //   addContainerWrapper: true,
      //   containerWidth: "600px",
      //   containerBackground: "#ffffff",
      //   minify: true,
      // });
      // if (result.success && result.html) {
      //   // Открыть превью в новом окне
      //   const previewWindow = window.open("", "_blank");
      //   if (previewWindow) {
      //     previewWindow.document.write(result.html);
      //     previewWindow.document.close();
      //   }
      // }
    } catch (error) {
      console.error("Ошибка при создании превью:", error);
    }
  };

  const handleCode = async () => {
    try {
      // const result = await copyToClipboard({
      //   includeDoctype: true,
      //   includeHtmlTag: true,
      //   includeHead: true,
      //   addContainerWrapper: true,
      //   minify: false,
      // });
      // if (result.success) {
      //   console.log("HTML код скопирован в буфер обмена");
      //   // Можно показать уведомление пользователю
      // } else {
      //   console.error("Ошибка при копировании:", result.error);
      // }
    } catch (error) {
      console.error("Ошибка при копировании:", error);
    }
  };

  const handleSave = () => {
    // Валидация перед сохранением
    // const validation = validateBlocksForExport();

    // if (!validation.isValid) {
    //   console.error(
    //     "Нельзя сохранить: есть ошибки валидации",
    //     validation.errors
    //   );
    //   return;
    // }

    console.log("Сохранение проекта...");
    // Здесь можно добавить логику сохранения в localStorage или на сервер
  };

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">
              EB
            </span>
          </div>
          <h1 className="text-lg font-semibold text-foreground">
            Email Builder
          </h1>
        </div>
        <div className="h-6 w-px bg-border" />
        <span className="text-sm text-muted-foreground">Untitled Template</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8"
          onClick={handlePreview}
          title="Предварительный просмотр"
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-8"
          onClick={handleCode}
          title="Скопировать HTML код (Ctrl+C)"
        >
          <Code className="h-4 w-4 mr-2" />
          Code
        </Button>

        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>

        <div className="h-6 w-px bg-border mx-1" />

        <Button
          variant="outline"
          size="sm"
          className="h-8 bg-transparent"
          onClick={handleSave}
          title="Сохранить (Ctrl+S)"
          // disabled={!hasBlocks}
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>

        <Button
          size="sm"
          className="h-8 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={handleExportHTML}
          // disabled={isExporting || !hasBlocks}
          // title={`Экспорт HTML (${blockCount} блоков)`}
        >
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? "Exporting..." : "Export HTML"}
        </Button>
      </div>
    </header>
  );
}
