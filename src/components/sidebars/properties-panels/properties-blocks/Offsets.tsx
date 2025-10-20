"use client";
import { Input } from "@/components/ui/input";
import { PropertiesBlockProps } from "@/types/properties-panels";
import { ensurePx } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import React from "react";
import OffsetEachSide from "./offset/OffsetEachSide";
import OffsetSwitch from "./offset/OffsetSwitch";
import useOffset from "@/hooks/panel-components/useOffset";

export default function Offsets({
  onChange,
  properties,
  handleSaveProperty,
}: PropertiesBlockProps) {
  // useOffset теперь не содержит локального состояния, и только парсит-генерирует значения из properties
  const {
    enabledPaddingForEachSide,
    enabledMarginForEachSide,
    perSidePadding,
    perSideMargin,
    handleSwitchPaddingMode,
    handleSwitchMarginMode,
    handleChangePadding,
    handleChangeMargin,
    toStringPadding,
    toStringMargin,
  } = useOffset(properties, {
    onChange,
    handleSaveProperty,
  });

  if (!properties) return null;

  return (
    <div className="space-y-3">
      <Label className="text-xs font-semibold text-foreground">Spacing</Label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Padding
          </Label>
          <OffsetSwitch
            enabledForEachSide={enabledPaddingForEachSide}
            setEnabledForEachSide={handleSwitchPaddingMode}
          />
          {enabledPaddingForEachSide ? (
            <OffsetEachSide
              values={perSidePadding}
              onChange={(side, value) => {
                handleChangePadding(side, value);
                const paddingString = toStringPadding({
                  ...perSidePadding,
                  [side]: value,
                });
                handleSaveProperty("padding", paddingString);
                onChange({ padding: paddingString });
              }}
            />
          ) : (
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
          )}
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Margin
          </Label>
          <OffsetSwitch
            enabledForEachSide={enabledMarginForEachSide}
            setEnabledForEachSide={handleSwitchMarginMode}
          />
          {enabledMarginForEachSide ? (
            <OffsetEachSide
              values={perSideMargin}
              onChange={(side, value) => {
                handleChangeMargin(side, value);
                const marginString = toStringMargin({
                  ...perSideMargin,
                  [side]: value,
                });
                handleSaveProperty("margin", marginString);
                onChange({ margin: marginString });
              }}
            />
          ) : (
            <Input
              placeholder="0px"
              className="bg-background border-input"
              value={String(properties?.margin ?? "0px")}
              onChange={(e) => {
                handleSaveProperty("margin", e.target.value);
                onChange({ margin: ensurePx(e.target.value) });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
