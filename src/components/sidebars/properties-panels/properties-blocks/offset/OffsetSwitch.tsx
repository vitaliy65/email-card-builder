import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

interface SwitchProps {
  enabledForEachSide: boolean;
  setEnabledForEachSide: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OffsetSwitch({
  enabledForEachSide,
  setEnabledForEachSide,
}: SwitchProps) {
  return (
    <div className="flex items-center space-x-2 mb-2">
      <Switch
        id="offset-mode"
        checked={enabledForEachSide}
        onCheckedChange={setEnabledForEachSide}
      />
      <Label htmlFor="offset-mode">Per-side</Label>
    </div>
  );
}
