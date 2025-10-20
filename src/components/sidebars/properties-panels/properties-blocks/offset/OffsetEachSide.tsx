import { Input } from "@/components/ui/input";
import { PerSideProps } from "@/hooks/panel-components/useOffset";
import React from "react";

interface OffsetEachSideProps {
  values: PerSideProps;
  onChange: (side: keyof PerSideProps, value: string) => void;
}

export default function OffsetEachSide({
  values,
  onChange,
}: OffsetEachSideProps) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 aspect-square">
      {/* Top */}
      <div className="col-start-2">
        <Input
          type="number"
          className="h-full rounded-none rounded-t-md text-center p-0"
          style={{
            appearance: "textfield",
            WebkitAppearance: "textfield",
            MozAppearance: "textfield",
          }}
          min={0}
          value={values.top}
          onChange={(e) => onChange("top", e.target.value)}
        />
      </div>
      {/* Left */}
      <div className="col-start-1 row-start-2">
        <Input
          type="number"
          className="h-full rounded-none rounded-l-md text-center p-0"
          style={{
            appearance: "textfield",
            WebkitAppearance: "textfield",
            MozAppearance: "textfield",
          }}
          min={0}
          value={values.left}
          onChange={(e) => onChange("left", e.target.value)}
        />
      </div>
      {/* Center box placeholder */}
      <div className="col-start-2 row-start-2 flex items-center justify-center">
        box
      </div>
      {/* Right */}
      <div className="col-start-3 row-start-2">
        <Input
          type="number"
          className="h-full rounded-none rounded-r-md text-center p-0"
          style={{
            appearance: "textfield",
            WebkitAppearance: "textfield",
            MozAppearance: "textfield",
          }}
          min={0}
          value={values.right}
          onChange={(e) => onChange("right", e.target.value)}
        />
      </div>
      {/* Bottom */}
      <div className="col-start-2 row-start-3">
        <Input
          type="number"
          className="h-full rounded-none rounded-b-md text-center p-0"
          style={{
            appearance: "textfield",
            WebkitAppearance: "textfield",
            MozAppearance: "textfield",
          }}
          min={0}
          value={values.bottom}
          onChange={(e) => onChange("bottom", e.target.value)}
        />
      </div>
    </div>
  );
}
