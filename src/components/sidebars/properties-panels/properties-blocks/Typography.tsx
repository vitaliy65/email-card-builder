"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Type,
  CaseUpper,
  CaseLower,
  ArrowUpZA,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PropertiesBlockProps } from "@/types/properties-panels";

// Кнопки-переключатели для выравнивания текста
const TEXT_ALIGN_OPTIONS = [
  { value: "left", label: "Left", icon: AlignLeft },
  { value: "center", label: "Center", icon: AlignCenter },
  { value: "right", label: "Right", icon: AlignRight },
  { value: "justify", label: "Justify", icon: AlignJustify },
];

// Кнопки-переключатели для декоративных свойств
const FONT_STYLE_OPTIONS = [
  { prop: "fontWeight", value: 700, label: "Bold", icon: Bold },
  { prop: "fontStyle", value: "italic", label: "Italic", icon: Italic },
  {
    prop: "textDecoration",
    value: "underline",
    label: "Underline",
    icon: Underline,
  },
  {
    prop: "textDecoration",
    value: "line-through",
    label: "Strike",
    icon: Strikethrough,
  },
];

// Кнопки-переключатели для преобразования регистра
const TEXT_TRANSFORM_OPTIONS = [
  { value: "none", label: "None", icon: Type },
  { value: "uppercase", label: "UP", icon: CaseUpper },
  { value: "lowercase", label: "low", icon: CaseLower },
  { value: "capitalize", label: "Cap", icon: ArrowUpZA },
];

export default function Typography({
  onChange,
  properties,
  handleSaveProperty,
}: PropertiesBlockProps) {
  // Простая версия getNextTextDecoration
  function getNextTextDecoration(current: string, value: string) {
    const items = (current || "").split(" ").filter((x) => x && x !== "none");
    const idx = items.indexOf(value);
    if (idx !== -1) {
      items.splice(idx, 1);
    } else {
      items.push(value);
    }
    return items.length ? items.join(" ") : "none";
  }

  // Упрощённая handleToggle
  const handleToggle = (
    prop: string,
    value: string | number,
    toggleType: "toggle" | "radio" = "toggle"
  ) => {
    let nextValue = value;

    if (toggleType === "radio") {
      // nothing to do
    } else if (prop === "fontWeight") {
      nextValue = properties?.fontWeight === value ? 400 : value;
    } else if (prop === "fontStyle") {
      nextValue = properties?.fontStyle === value ? "normal" : value;
    } else if (prop === "textDecoration") {
      nextValue = getNextTextDecoration(
        properties?.textDecoration?.toString() || "",
        String(value)
      );
    }

    handleSaveProperty(prop, nextValue);
    onChange({ properties: { ...properties, [prop]: nextValue } });
  };

  return (
    <div className="space-y-3">
      <Label className="text-xs font-semibold text-foreground">
        Typography
      </Label>

      <div className="flex gap-2">
        {/* Font size */}
        <div className="flex-1">
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

        {/* Цвет текста */}
        <div className="flex-1">
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Text Color
          </Label>
          <div className="flex gap-2">
            <Input
              type="color"
              className="w-12 h-9 p-1 bg-background border-input cursor-pointer"
              value={properties?.background}
              onChange={(e) => {
                const value = e.target.value;
                handleSaveProperty("color", value);
                onChange({
                  properties: { ...properties, color: value },
                });
              }}
            />
            <Input
              placeholder="#007bff"
              className="flex-1 bg-background border-input"
              value={properties?.background}
              onChange={(e) => {
                const value = e.target.value;
                handleSaveProperty("color", value);
                onChange({
                  properties: { ...properties, color: value },
                });
              }}
            />
          </div>
        </div>
      </div>

      {/* Text decorative style toggles */}
      <div className="mt-2">
        <Label className="text-xs text-muted-foreground mb-1 block">
          Text Style
        </Label>
        <div className="flex gap-1">
          {FONT_STYLE_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            let active = false;
            if (opt.prop === "fontWeight")
              active = properties?.fontWeight === opt.value;
            if (opt.prop === "fontStyle")
              active = properties?.fontStyle === opt.value;
            if (opt.prop === "textDecoration") {
              active =
                typeof properties?.textDecoration === "string"
                  ? (properties.textDecoration || "")
                      .split(" ")
                      .includes(String(opt.value))
                  : false;
            }
            return (
              <button
                key={opt.label}
                type="button"
                className={cn(
                  "px-2 py-1 rounded border flex items-center justify-center",
                  active
                    ? "border-primary bg-muted text-primary"
                    : "border-input"
                )}
                aria-label={opt.label}
                title={opt.label}
                onClick={() => handleToggle(opt.prop, opt.value, "toggle")}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Text Transform (uppercase, lowercase, capitalize) */}
      <div className="mt-2">
        <Label className="text-xs text-muted-foreground mb-1 block">
          Transform
        </Label>
        <div className="flex gap-1">
          {TEXT_TRANSFORM_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const active =
              properties?.textTransform === opt.value ||
              (!properties?.textTransform && opt.value === "none");
            return (
              <button
                key={opt.value}
                type="button"
                className={cn(
                  "px-2 py-1 rounded border flex items-center justify-center",
                  active
                    ? "border-primary bg-muted text-primary"
                    : "border-input"
                )}
                aria-label={opt.label}
                title={opt.label}
                onClick={() =>
                  handleToggle("textTransform", opt.value, "radio")
                }
              >
                <Icon size={18} />
              </button>
            );
          })}
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
