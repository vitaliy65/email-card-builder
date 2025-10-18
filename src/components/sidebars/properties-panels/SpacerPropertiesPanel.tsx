"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SpacerPropertiesPanelProps } from "@/types/properties-panels";
import { useEffect } from "react";
import useSaveProperties from "@/hooks/properties-panels/useSaveValue";
import { GridProperties } from "@/types/block";

export default function SpacerPropertiesPanel({
  block,
  onChange,
}: SpacerPropertiesPanelProps) {
  const { properties, setProperties, handleSaveProperty } =
    useSaveProperties<GridProperties>(undefined);

  useEffect(() => {
    setProperties(block.properties);
  }, [block.uuid]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-xs font-semibold text-foreground">Spacer</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Height"
            className="bg-background border-input"
            value={properties?.height || "24px"}
            onChange={(e) => {
              handleSaveProperty("height", e.target.value);
              onChange({ height: e.target.value });
            }}
          />
          <Input
            placeholder="Background"
            className="bg-background border-input"
            value={properties?.background || "#ffffff"}
            onChange={(e) => {
              handleSaveProperty("background", e.target.value);
              onChange({ background: e.target.value });
            }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-xs font-semibold text-foreground">Spacing</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">
              Padding
            </Label>
            <Input
              placeholder="0"
              className="bg-background border-input"
              value={properties?.padding || "0"}
              onChange={(e) => {
                handleSaveProperty("padding", e.target.value);
                onChange({ padding: e.target.value });
              }}
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">
              Margin
            </Label>
            <Input
              placeholder="0"
              className="bg-background border-input"
              value={properties?.margin || "0"}
              onChange={(e) => {
                handleSaveProperty("margin", e.target.value);
                onChange({ margin: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
