import { HeadingPropertiesPanelProps } from "@/types/properties-panels";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import Typography from "./properties-blocks/Typography";
import Colors from "./properties-blocks/Colors";
import Borders from "./properties-blocks/Borders";
import Sizes from "./properties-blocks/Sizes";
import Offsets from "./properties-blocks/Offsets";
import { useEffect } from "react";
import useSaveProperties from "@/hooks/properties-panels/useSaveValue";
import { GeneralBlockProperties } from "@/types/block";

export default function HeadingPropertiesPanel({
  block,
  onChange,
}: HeadingPropertiesPanelProps) {
  const { properties, setProperties, handleSaveProperty } =
    useSaveProperties<GeneralBlockProperties>(undefined);

  useEffect(() => {
    setProperties(block.properties);
  }, [block.uuid]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-xs font-semibold text-foreground">Content</Label>
        <Textarea
          placeholder="Enter heading..."
          className="bg-background border-input"
          value={properties?.content || ""}
          onChange={(e) => {
            handleSaveProperty("content", e.target.value);
            onChange({ content: e.target.value });
          }}
        />
      </div>
      <Typography
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={onChange}
      />
      <Colors
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={onChange}
      />
      <Borders
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={onChange}
      />
      <Sizes
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={onChange}
      />
      <Offsets
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={onChange}
      />
    </div>
  );
}
