import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // Assuming you have this utility as in BlockJustification
import { PropertiesBlockProps } from "@/types/properties-panels";

const OPTIONS = [
  { value: "cover", label: "Cover" },
  { value: "contain", label: "Contain" },
  { value: "fill", label: "Fill" },
  { value: "none", label: "None" },
  { value: "scale-down", label: "Scale Down" },
];

export default function ImageContain({
  onChange,
  properties,
  handleSaveProperty,
}: PropertiesBlockProps) {
  return (
    <div className="space-y-3 mt-2">
      <Label className="text-xs font-semibold text-foreground">
        Object Fit
      </Label>
      <div className="flex gap-1">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={cn(
              "px-2 py-1 text-xs rounded border flex items-center justify-center flex-1",
              properties?.objectFit === opt.value
                ? "border-primary bg-muted text-primary"
                : "border-input"
            )}
            aria-label={opt.label}
            title={opt.label}
            onClick={() => {
              handleSaveProperty("objectFit", opt.value);
              onChange({
                objectFit: opt.value as React.CSSProperties["objectFit"],
              });
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
