import { Label } from "@/components/ui/label";
import { PropertiesBlockProps } from "@/types/properties-panels";
import {
  AlignHorizontalJustifyStart,
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
  AlignHorizontalSpaceBetween,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalSpaceBetween,
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils"; // Assuming cn utility import as used elsewhere

const BLOCK_ALIGN_HORIZONTAL_OPTIONS = [
  { value: "flex-start", label: "Left", icon: AlignHorizontalJustifyStart },
  { value: "center", label: "Center", icon: AlignHorizontalJustifyCenter },
  { value: "flex-end", label: "Right", icon: AlignHorizontalJustifyEnd },
  {
    value: "space-between",
    label: "Justify",
    icon: AlignHorizontalSpaceBetween,
  },
];

const BLOCK_ALIGN_VERTICAL_OPTIONS = [
  { value: "flex-start", label: "Top", icon: AlignVerticalJustifyStart },
  { value: "center", label: "Center", icon: AlignVerticalJustifyCenter },
  { value: "flex-end", label: "Bottom", icon: AlignVerticalJustifyEnd },
  { value: "space-between", label: "Justify", icon: AlignVerticalSpaceBetween },
];

export default function BlockJustification({
  onChange,
  properties,
  handleSaveProperty,
}: PropertiesBlockProps) {
  return (
    <div className="space-y-3 mt-2">
      <Label className="text-xs font-semibold text-foreground">
        Block Alignment{" "}
        <span className="text-red-500">You need (display: flex)</span>
      </Label>
      <div>
        <Label className="text-xs text-muted-foreground mb-1 block">
          Horizontal Align
        </Label>
        <div className="flex gap-1">
          {BLOCK_ALIGN_HORIZONTAL_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.value}
                type="button"
                className={cn(
                  "px-2 py-1 rounded border flex items-center justify-center",
                  properties?.justifyContent === opt.value
                    ? "border-primary bg-muted text-primary"
                    : "border-input"
                )}
                aria-label={opt.label}
                title={opt.label}
                onClick={() => {
                  handleSaveProperty("justifyContent", opt.value);
                  onChange({ justifyContent: opt.value });
                }}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <Label className="text-xs text-muted-foreground mb-1 block">
          Vertical Align
        </Label>
        <div className="flex gap-1">
          {BLOCK_ALIGN_VERTICAL_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.value}
                type="button"
                className={cn(
                  "px-2 py-1 rounded border flex items-center justify-center",
                  properties?.alignItems === opt.value
                    ? "border-primary bg-muted text-primary"
                    : "border-input"
                )}
                aria-label={opt.label}
                title={opt.label}
                onClick={() => {
                  handleSaveProperty("alignItems", opt.value);
                  onChange({ alignItems: opt.value });
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
