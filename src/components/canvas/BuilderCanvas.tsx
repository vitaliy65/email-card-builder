"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Droppable from "../block-states/Droppable";
import DroppableBlock from "../blocks/DroppableBlock";

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

  const currentSize =
    CANVAS_SIZES.find((s) => s.value === canvasSize) || CANVAS_SIZES[0];

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
            <span>0 blocks</span>
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
              className="bg-card border border-border h-full rounded-xl shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]"
              style={{
                width: currentSize.width,
              }}
            >
              <Card className="bg-none border-none shadow-none">
                <div className="bg-white h-full p-4">
                  {[...Array(5)].map((_, i) => (
                    <DroppableBlock key={i} id={`droppable-block-${i}`} />
                  ))}
                </div>
              </Card>
            </Droppable>
          </div>
        </div>
      </div>
    </div>
  );
}
