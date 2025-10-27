import { Input } from "@/components/ui/input";
import { PropertiesBlockProps } from "@/types/properties-panels";
import { ensurePx } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import React from "react";

export default function Sizes({
  block,
  onChange,
  properties,
  handleSaveProperty,
}: PropertiesBlockProps) {
  return (
    <div className="space-y-3">
      <Label className="text-xs font-semibold text-foreground">Size</Label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Width
          </Label>
          <Input
            placeholder="auto"
            className="bg-background border-input"
            value={String(properties?.width ?? "auto")}
            onChange={(e) => {
              const value = ensurePx(e.target.value);
              handleSaveProperty("width", e.target.value);
              onChange({ properties: { ...properties, width: value } });
            }}
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Height
          </Label>
          <Input
            placeholder="auto"
            className="bg-background border-input"
            value={String(properties?.height ?? "auto")}
            onChange={(e) => {
              const value = ensurePx(e.target.value);
              handleSaveProperty("height", e.target.value);
              onChange({ properties: { ...properties, height: value } });
            }}
          />
        </div>
      </div>
    </div>
  );
}
