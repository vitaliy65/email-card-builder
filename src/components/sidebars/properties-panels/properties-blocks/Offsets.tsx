"use client";
import { Input } from "@/components/ui/input";
import { PropertiesBlockProps } from "@/types/properties-panels";
import { ensurePx } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import React, { useEffect } from "react";
import OffsetEachSide from "./offset/OffsetEachSide";
import OffsetSwitch from "./offset/OffsetSwitch";
import useOffset from "@/hooks/panel-components/useOffset";

export default function Offsets({
  onChange,
  properties,
  handleSaveProperty,
}: PropertiesBlockProps) {
  const {
    enabledPaddingForEachSide,
    enabledMarginForEachSide,
    handleSwitchPaddingMode,
    handleSwitchMarginMode,
    perSidePadding,
    perSideMargin,
    handleChangePadding,
    handleChangeMargin,
    toStringMargin,
    toStringPadding,
  } = useOffset(properties);

  useEffect(() => {
    handleSaveProperty("padding", toStringPadding());
    onChange({ padding: toStringPadding() });
  }, [perSidePadding]);

  useEffect(() => {
    handleSaveProperty("margin", toStringMargin());
    onChange({ margin: toStringMargin() });
  }, [perSideMargin]);

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
              onChange={handleChangePadding}
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
              onChange={handleChangeMargin}
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
