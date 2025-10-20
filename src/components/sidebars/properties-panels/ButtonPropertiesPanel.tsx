import { ButtonPropertiesPanelProps } from "@/types/properties-panels";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import Typography from "./properties-blocks/Typography";
import Colors from "./properties-blocks/Colors";
import Borders from "./properties-blocks/Borders";
import Sizes from "./properties-blocks/Sizes";
import Offsets from "./properties-blocks/Offsets";
import { useEffect } from "react";
import useSaveProperties from "@/hooks/properties-panels/useSaveValue";
import { ButtonBlockItem, GeneralBlockProperties } from "@/types/block"; // adjust this import path as necessary
import ActionLink from "./properties-blocks/ActionLink";
import useSaveField from "@/hooks/properties-panels/useSaveField";

export default function ButtonPropertiesPanel({
  block,
  onChange,
  onChangeBlockField,
}: ButtonPropertiesPanelProps) {
  const { properties, setProperties, handleSaveProperty } =
    useSaveProperties<GeneralBlockProperties>(undefined);
  const { fields, setFields, handleSaveField } =
    useSaveField<ButtonBlockItem>(undefined);

  useEffect(() => {
    setProperties(block.properties);
    setFields(block);
  }, [block.uuid]);

  if (!properties) return;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-xs font-semibold text-foreground">Content</Label>
        <Textarea
          placeholder="Enter text..."
          className="bg-background border-input"
          value={properties?.content || ""}
          onChange={(e) => {
            handleSaveProperty("content", e.target.value);
            onChange({ content: e.target.value });
          }}
        />
      </div>

      <ActionLink
        block={block}
        fields={fields}
        handleSaveField={handleSaveField}
        onChangeBlockField={onChangeBlockField}
      />

      {/* Typography - all associated with text */}
      <Typography
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={onChange}
      />

      {/* colors for background and border*/}
      <Colors
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={onChange}
      />

      {/* Граница */}
      <Borders
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={onChange}
      />

      {/* Размер */}
      <Sizes
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={onChange}
      />

      {/* Отступы */}
      <Offsets
        block={block}
        properties={properties}
        handleSaveProperty={handleSaveProperty}
        onChange={onChange}
      />
    </div>
  );
}
