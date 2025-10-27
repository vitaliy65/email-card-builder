"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import { cn } from "@/lib/utils";
import { PropertiesBlockProps } from "@/types/properties-panels";

const TEXT_ALIGN_OPTIONS = [
  { value: "left", label: "Left", icon: AlignLeft },
  { value: "center", label: "Center", icon: AlignCenter },
  { value: "right", label: "Right", icon: AlignRight },
  { value: "justify", label: "Justify", icon: AlignJustify },
];

export default function Typography({
  onChange,
  properties,
  handleSaveProperty,
}: PropertiesBlockProps) {
  return (
    <div className="space-y-3">
      <Label className="text-xs font-semibold text-foreground">
        Typography
      </Label>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Font Size
          </Label>
          <Input
            type="number"
            placeholder="18"
            className="bg-background border-input"
            value={String(properties?.fontSize ?? "")}
            min={1}
            onChange={(e) => {
              const value = Number(e.target.value);
              handleSaveProperty("fontSize", value);
              onChange({ properties: { ...properties, fontSize: value } });
            }}
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Weight
          </Label>
          <select
            className="w-full h-9 px-3 rounded-md bg-background border border-input text-sm"
            value={String(properties?.fontWeight ?? "400")}
            onChange={(e) => {
              const value = Number(e.target.value);
              handleSaveProperty("fontWeight", value);
              onChange({ properties: { ...properties, fontWeight: value } });
            }}
          >
            <option value="400">Normal</option>
            <option value="600">Semibold</option>
            <option value="700">Bold</option>
          </select>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Text Color
          </Label>
          <Input
            placeholder="#ffffff"
            className="bg-background border-input"
            value={properties?.color || ""}
            onChange={(e) => {
              const value = e.target.value;
              handleSaveProperty("color", value);
              onChange({ properties: { ...properties, color: value } });
            }}
          />
        </div>
      </div>

      {/* Text Align */}
      <div className="mt-2">
        <Label className="text-xs text-muted-foreground mb-1 block">
          Text Align
        </Label>
        <div className="flex gap-1">
          {TEXT_ALIGN_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.value}
                type="button"
                className={cn(
                  "px-2 py-1 rounded border flex items-center justify-center",
                  properties?.textAlign === opt.value
                    ? "border-primary bg-muted text-primary"
                    : "border-input"
                )}
                aria-label={opt.label}
                title={opt.label}
                onClick={() => {
                  handleSaveProperty("textAlign", opt.value);
                  onChange({
                    properties: {
                      ...properties,
                      textAlign: opt.value as CanvasTextAlign,
                    },
                  });
                }}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
