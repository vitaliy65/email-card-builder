import { Input } from "@/components/ui/input";
import { ensurePx } from "@/lib/utils";
import { PropertiesBlockProps } from "@/types/properties-panels";
import { Label } from "@radix-ui/react-label";
import React from "react";

export default function Borders({
  block,
  onChange,
  properties,
  handleSaveProperty,
}: PropertiesBlockProps) {
  return (
    <div className="space-y-3">
      <Label className="text-xs font-semibold text-foreground">Border</Label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Radius
          </Label>
          <Input
            placeholder="8px"
            className="bg-background border-input"
            value={String(properties?.borderRadius ?? "8px")}
            onChange={(e) => {
              const value = ensurePx(e.target.value);
              handleSaveProperty("borderRadius", value);
              onChange({ borderRadius: value });
            }}
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Width
          </Label>
          <Input
            placeholder="1px"
            className="bg-background border-input"
            value={String(properties?.borderWidth ?? "1px")}
            onChange={(e) => {
              const value = ensurePx(e.target.value);
              handleSaveProperty("borderWidth", value);
              onChange({ borderWidth: value });
            }}
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Style
          </Label>
          <select
            className="w-full h-9 px-3 rounded-md bg-background border border-input text-sm"
            value={properties?.borderStyle ?? "solid"}
            onChange={(e) => {
              handleSaveProperty("borderStyle", e.target.value);
              onChange({ borderStyle: e.target.value });
            }}
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
            <option value="double">Double</option>
            <option value="groove">Groove</option>
            <option value="ridge">Ridge</option>
            <option value="inset">Inset</option>
            <option value="outset">Outset</option>
            <option value="none">None</option>
          </select>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Display
          </Label>
          <select
            className="w-full h-9 px-3 rounded-md bg-background border border-input text-sm"
            value={properties?.display ?? "inline-block"}
            onChange={(e) => {
              handleSaveProperty("display", e.target.value);
              onChange({ display: e.target.value });
            }}
          >
            <option value="inline-block">Inline-block</option>
            <option value="block">Block</option>
            <option value="inline">Inline</option>
            <option value="flex">Flex</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
    </div>
  );
}
