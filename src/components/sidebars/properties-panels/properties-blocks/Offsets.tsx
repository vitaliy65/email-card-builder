import { Input } from "@/components/ui/input";
import { PropertiesBlockProps } from "@/types/properties-panels";
import { ensurePx } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import React from "react";

export default function Offsets({
  block,
  onChange,
  properties,
  handleSaveProperty,
}: PropertiesBlockProps) {
  return (
    <div className="space-y-3">
      <Label className="text-xs font-semibold text-foreground">Spacing</Label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Padding
          </Label>
          <Input
            placeholder="12px 24px"
            className="bg-background border-input"
            value={String(properties?.padding ?? "12px 24px")}
            onChange={(e) => {
              const value = ensurePx(e.target.value);
              handleSaveProperty("padding", e.target.value);
              onChange({ padding: value });
            }}
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Margin
          </Label>
          <Input
            placeholder="0px"
            className="bg-background border-input"
            value={String(properties?.margin ?? "0px")}
            onChange={(e) => {
              const value = ensurePx(e.target.value);
              handleSaveProperty("margin", e.target.value);
              onChange({ margin: value });
            }}
          />
        </div>
      </div>
    </div>
  );
}
