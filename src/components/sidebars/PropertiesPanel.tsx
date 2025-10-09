import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Palette,
  Trash2,
} from "lucide-react";

export function PropertiesPanel() {
  return (
    <aside className="w-80 border-l border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">Properties</h2>
        <p className="text-xs text-muted-foreground mt-1">
          No element selected
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <Palette className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground max-w-[200px]">
            Select an element on the canvas to edit its properties
          </p>
        </div>

        {/* Example properties (hidden by default) */}
        <div className="space-y-6 hidden">
          {/* Text properties */}
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-foreground">
              Content
            </Label>
            <Input
              placeholder="Enter text..."
              className="bg-background border-input"
            />
          </div>

          {/* Typography */}
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-foreground">
              Typography
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Font Size
                </Label>
                <Input
                  type="number"
                  placeholder="16"
                  className="bg-background border-input"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Weight
                </Label>
                <select className="w-full h-9 px-3 rounded-md bg-background border border-input text-sm">
                  <option>Normal</option>
                  <option>Bold</option>
                </select>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
              >
                <Underline className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Alignment */}
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-foreground">
              Alignment
            </Label>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-foreground">
              Colors
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Text
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    className="w-12 h-9 p-1 bg-background border-input cursor-pointer"
                    defaultValue="#000000"
                  />
                  <Input
                    placeholder="#000000"
                    className="flex-1 bg-background border-input"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Background
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    className="w-12 h-9 p-1 bg-background border-input cursor-pointer"
                    defaultValue="#ffffff"
                  />
                  <Input
                    placeholder="#ffffff"
                    className="flex-1 bg-background border-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Spacing */}
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-foreground">
              Spacing
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Padding
                </Label>
                <Input
                  placeholder="16px"
                  className="bg-background border-input"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Margin
                </Label>
                <Input
                  placeholder="0px"
                  className="bg-background border-input"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-border">
            <Button variant="destructive" size="sm" className="w-full">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Element
            </Button>
          </div>
        </div>
      </div>

      {/* Template settings */}
      <div className="p-4 border-t border-border">
        <Card className="p-3 bg-muted/50 border-border">
          <h3 className="text-xs font-semibold text-foreground mb-2">
            Template Settings
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Width</span>
              <span className="text-foreground font-medium">600px</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Background</span>
              <div className="w-5 h-5 rounded border border-border bg-white" />
            </div>
          </div>
        </Card>
      </div>
    </aside>
  );
}
