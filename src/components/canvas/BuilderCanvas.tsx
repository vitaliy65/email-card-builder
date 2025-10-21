"use client";
import { Fragment } from "react";
import { Card } from "@/components/ui/card";
import DroppableBlock from "../blocks/DroppableBlock";
import { useAppSelector } from "@/store/hooks";
import ChangPosBlock from "../blocks/block-handlers/ChangPosBlock";
import { useBlockRenderer, useCanvasControls } from "@/hooks";
import BlockContainer from "../blocks/block-handlers/block-container";

export function BuilderCanvas() {
  // Используем хук для управления canvas вместо локального состояния
  const {
    canvasSize,
    zoom,
    setCanvasSize,
    setZoom,
    getCanvasStyles,
    currentSize,
    CANVAS_SIZES,
    ZOOM_LEVELS,
  } = useCanvasControls({
    persistSettings: true, // Сохранять настройки в localStorage
    storageKey: "email-builder-canvas-settings",
  });

  // Используем хук для рендеринга блоков
  const { renderBlocks } = useBlockRenderer();

  // Получаем блоки из Redux
  const { canvasBlocks } = useAppSelector((state) => state.blocks);

  if (!canvasBlocks) {
    return (
      <div className="flex flex-1 items-center justify-center py-36">
        <div className="animate-spin rounded-full h-9 w-9 border-t-2 border-b-2 border-muted" />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background overflow-auto">
      <div className="p-8 flex items-start justify-center h-full">
        <div className="w-full h-full max-w-3xl">
          {/* Canvas toolbar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Canvas</span>
              <div className="h-4 w-px bg-border" />
              <select
                className="text-sm bg-secondary text-secondary-foreground border-0 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring"
                value={canvasSize}
                onChange={(e) => setCanvasSize(e.target.value)}
              >
                {CANVAS_SIZES.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Zoom:</span>
              <select
                className="text-xs bg-secondary text-secondary-foreground border-0 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
              >
                {ZOOM_LEVELS.map((z) => (
                  <option key={z.value} value={z.value}>
                    {z.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Canvas footer info */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span>{canvasBlocks.length} blocks</span>
            <div className="h-3 w-px bg-border" />
            <span>{currentSize.width}px width</span>
            <div className="h-3 w-px bg-border" />
            <span>Ready to export</span>
          </div>

          {/* Email canvas */}
          <div
            className="w-full min-h-[700px] flex items-center justify-center py-4"
            style={getCanvasStyles()}
          >
            <div
              className="bg-card border border-border h-full rounded-xl shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]"
              style={{
                width: currentSize.width,
              }}
            >
              <Card className="bg-none border-none shadow-none">
                <div className="bg-white h-full p-4">
                  {/* ChangPosBlock перед первым элементом */}
                  {canvasBlocks.length > 0 && (
                    <ChangPosBlock
                      prevUuid={null}
                      nextUuid={canvasBlocks[0].uuid}
                    />
                  )}

                  {/* Используем хук для рендеринга блоков */}
                  {renderBlocks(canvasBlocks).map((renderedBlock, index) => {
                    const block = canvasBlocks[index];
                    const prevUuid = canvasBlocks[index].uuid;
                    const nextUuid =
                      index < canvasBlocks.length - 1
                        ? canvasBlocks[index + 1].uuid
                        : null;

                    return (
                      <Fragment key={block.uuid}>
                        <BlockContainer
                          uuid={block.uuid}
                          id={block.id}
                          type={block.type}
                        >
                          {renderedBlock}
                        </BlockContainer>
                        <ChangPosBlock
                          prevUuid={prevUuid}
                          nextUuid={nextUuid}
                        />
                      </Fragment>
                    );
                  })}

                  {/* DroppableBlock в самом конце */}
                  <DroppableBlock id="droppable-block-1" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
