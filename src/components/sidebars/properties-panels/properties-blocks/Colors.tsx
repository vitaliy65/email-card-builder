import { Input } from "@/components/ui/input";
import { PropertiesBlockProps } from "@/types/properties-panels";
import { Label } from "@radix-ui/react-label";
import React from "react";

export default function Colors({
  block,
  onChange,
  properties,
  handleSaveProperty,
}: PropertiesBlockProps) {
  return (
    <div className="space-y-3">
      <Label className="text-xs font-semibold text-foreground">Colors</Label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Background
          </Label>
          <div className="flex gap-2">
            <Input
              type="color"
              className="w-12 h-9 p-1 bg-background border-input cursor-pointer"
              value={properties?.background}
              onChange={(e) => {
                handleSaveProperty("background", e.target.value);
                onChange({ background: e.target.value });
              }}
            />
            <Input
              placeholder="#007bff"
              className="flex-1 bg-background border-input"
              value={properties?.background}
              onChange={(e) => {
                handleSaveProperty("background", e.target.value);
                onChange({ background: e.target.value });
              }}
            />
          </div>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Border Color
          </Label>
          <div className="flex gap-2">
            <Input
              type="color"
              className="w-12 h-9 p-1 bg-background border-input cursor-pointer"
              value={properties?.borderColor}
              onChange={(e) => {
                handleSaveProperty("borderColor", e.target.value);
                onChange({ borderColor: e.target.value });
              }}
            />
            <Input
              placeholder="#007bff"
              className="flex-1 bg-background border-input"
              value={properties?.borderColor}
              onChange={(e) => {
                handleSaveProperty("borderColor", e.target.value);
                onChange({ borderColor: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
