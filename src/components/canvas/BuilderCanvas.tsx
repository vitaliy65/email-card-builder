"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Droppable from "../block-states/Droppable";
import DroppableBlock from "../blocks/DroppableBlock";
import { useAppSelector } from "@/store/hooks";

// Import blocks from components/blocks
import TextBlock from "../blocks/TextBlock";
import HeadingBlock from "../blocks/HeadingBlock";
import ButtonBlock from "../blocks/ButtonBlock";
import ImageBlock from "../blocks/ImageBlock";
import DividerBlock from "../blocks/DividerBlock";
import SpacerBlock from "../blocks/SpacerBlock";
import ColumnsBlock from "../blocks/ColumnsBlock";
import { CanvasBlock } from "@/store/slices/blocksSlice";
import BlockContainer from "../blocks/block-handlers/block-container";

const CANVAS_SIZES = [
  { label: "Desktop (600px)", value: "desktop", width: 600 },
  { label: "Mobile (320px)", value: "mobile", width: 320 },
];

const ZOOM_LEVELS = [
  { label: "150%", value: 1.5 },
  { label: "125%", value: 1.25 },
  { label: "100%", value: 1 },
  { label: "75%", value: 0.75 },
  { label: "50%", value: 0.5 },
];

export function BuilderCanvas() {
  const [canvasSize, setCanvasSize] = useState(CANVAS_SIZES[0].value);
  const [zoom, setZoom] = useState(1);
  const { canvasBlocks } = useAppSelector((state) => state.blocks);

  const currentSize =
    CANVAS_SIZES.find((s) => s.value === canvasSize) || CANVAS_SIZES[0];

  const renderBlock = (block: CanvasBlock) => {
    if (!block) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let BlockComponent: React.ComponentType<any> | null = null;
    switch (block.type) {
      case "text":
        BlockComponent = TextBlock;
        break;
      case "heading":
        BlockComponent = HeadingBlock;
        break;
      case "button":
        BlockComponent = ButtonBlock;
        break;
      case "image":
        BlockComponent = ImageBlock;
        break;
      case "divider":
        BlockComponent = DividerBlock;
        break;
      case "spacer":
        BlockComponent = SpacerBlock;
        break;
      case "columns":
        BlockComponent = ColumnsBlock;
        break;
      default:
        BlockComponent = null;
    }

    return (
      <BlockContainer id={block.uuid}>
        {BlockComponent ? <BlockComponent block={block} /> : null}
      </BlockContainer>
    );
  };

  useEffect(() => {}, [canvasBlocks.length]);

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
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top center",
              transition: "transform 0.2s",
            }}
          >
            <Droppable
              id="canvas"
              className="bg-card border border-border h-full rounded-xl shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]"
              style={{
                width: currentSize.width,
              }}
            >
              <Card className="bg-none border-none shadow-none">
                <div className="bg-white h-full p-4">
                  {/* Отображаем реальные блоки */}
                  {canvasBlocks.map((block) => (
                    <div key={block.uuid} className="mb-2">
                      {renderBlock(block)}
                    </div>
                  ))}

                  <DroppableBlock id={`droppable-block-1`} />
                </div>
              </Card>
            </Droppable>
          </div>
        </div>
      </div>
    </div>
  );
}
