import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PropertiesBlockProps } from "@/types/properties-panels";
import React, { useEffect, useState } from "react";

interface GradientProps {
  degrees: number;
  firstPoint: string;
  secondPoint: string;
}

export default function Colors({
  block,
  onChange,
  properties,
  handleSaveProperty,
}: PropertiesBlockProps) {
  const [enableGradient, setEnableGradient] = useState(false);
  const [gradient, setGradient] = useState<GradientProps>({
    degrees: 90,
    firstPoint: "#3F2B96",
    secondPoint: "#A8C0FF",
  });

  useEffect(() => {
    if (enableGradient) {
      const currentGradient = `linear-gradient(${gradient.degrees}deg, ${gradient.firstPoint} 0%, ${gradient.secondPoint} 100%)`;
      onChange({ background: currentGradient });
    } else {
      onChange({ background: properties?.background });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableGradient]);

  // Для обновления цвета/градусов градиента
  const handleGradientChange = (
    field: keyof GradientProps,
    value: string | number
  ) => {
    const updatedGradient = {
      ...gradient,
      [field]: value,
    };
    setGradient(updatedGradient);

    // Формируем строку градиента вида 'linear-gradient(90deg, #3F2B96 0%, #A8C0FF 100%)'
    const newGradient = `linear-gradient(${updatedGradient.degrees}deg, ${updatedGradient.firstPoint} 0%, ${updatedGradient.secondPoint} 100%)`;
    onChange({ background: newGradient });
  };

  return (
    <div className="space-y-3">
      <Label className="text-xs font-semibold text-foreground">Colors</Label>
      <div className="flex items-center space-x-2">
        <Switch
          id="gradient-mode"
          checked={enableGradient}
          onCheckedChange={() => {
            if (enableGradient) {
              const currentGradient = `linear-gradient(${gradient.degrees}deg, ${gradient.firstPoint} 0%, ${gradient.secondPoint} 100%)`;
              onChange({ background: currentGradient });
            } else {
              onChange({ background: properties?.background });
            }
            setEnableGradient((prev) => !prev);
          }}
        />
        <Label htmlFor="gradient-mode">Enable Gradient Mode</Label>
      </div>
      <div
        className={`grid ${
          enableGradient ? "grid-cols-1" : "grid-cols-2"
        } gap-2`}
      >
        <div className={`${enableGradient ? "hidden" : ""}`}>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Background
          </Label>
          <div className="flex gap-2">
            <Input
              type="color"
              className="w-12 h-9 p-1 bg-background border-input cursor-pointer"
              value={properties?.background}
              onChange={(e) => {
                handleSaveProperty("background", e.target.value);
                onChange({ background: e.target.value });
              }}
            />
            <Input
              placeholder="#007bff"
              className="flex-1 bg-background border-input"
              value={properties?.background}
              onChange={(e) => {
                handleSaveProperty("background", e.target.value);
                onChange({ background: e.target.value });
              }}
            />
          </div>
        </div>

        {/* Градиентная форма выбранного пользователем цвета, с красивым предпросмотром и интуитивными полями */}
        <div className={`${enableGradient ? "" : "hidden"}`}>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Gradient
          </Label>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="flex">
                <div className="flex flex-col items-center gap-1">
                  <Input
                    type="color"
                    className="w-10 h-full p-0 bg-background border-none cursor-pointer rounded-none rounded-l-md"
                    value={gradient.firstPoint}
                    onChange={(e) =>
                      handleGradientChange("firstPoint", e.target.value)
                    }
                  />
                </div>
                <Input
                  placeholder="#HEX"
                  className="flex-1 bg-background border-input rounded-none rounded-r-md"
                  value={gradient.firstPoint}
                  maxLength={7}
                  onChange={(e) =>
                    handleGradientChange("firstPoint", e.target.value)
                  }
                />
              </div>
              <span className="mx-2 text-muted-foreground">→</span>
              <div className="flex">
                <div className="flex flex-col items-center gap-1">
                  <Input
                    type="color"
                    className="w-10 h-full p-0 border-none outline-none cursor-pointer rounded-none rounded-l-md"
                    value={gradient.secondPoint}
                    onChange={(e) =>
                      handleGradientChange("secondPoint", e.target.value)
                    }
                  />
                </div>
                <Input
                  placeholder="#HEX"
                  className="flex-1 bg-background border-input rounded-none rounded-r-md"
                  value={gradient.secondPoint}
                  maxLength={7}
                  onChange={(e) =>
                    handleGradientChange("secondPoint", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs text-muted-foreground">Angle:</Label>
              <Input
                type="number"
                min={0}
                max={360}
                step={1}
                className="w-16 bg-background border-input"
                value={gradient.degrees}
                onChange={(e) =>
                  handleGradientChange("degrees", Number(e.target.value))
                }
              />
              <span className="text-xs text-muted-foreground">deg</span>
              {/* Превью градиента, красиво */}
              <div
                className="aspect-square flex-1 rounded shadow-inner border"
                style={{
                  background: `linear-gradient(${gradient.degrees}deg, ${gradient.firstPoint} 0%, ${gradient.secondPoint} 100%)`,
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Border Color
          </Label>
          <div className="flex gap-2">
            <Input
              type="color"
              className="w-12 h-9 p-1 bg-background border-input cursor-pointer"
              value={properties?.borderColor}
              onChange={(e) => {
                handleSaveProperty("borderColor", e.target.value);
                onChange({ borderColor: e.target.value });
              }}
            />
            <Input
              placeholder="#007bff"
              className="flex-1 bg-background border-input"
              value={properties?.borderColor}
              onChange={(e) => {
                handleSaveProperty("borderColor", e.target.value);
                onChange({ borderColor: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
