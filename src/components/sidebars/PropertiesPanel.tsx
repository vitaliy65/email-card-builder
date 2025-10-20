"use client";
import { Card } from "@/components/ui/card";
import { Link, Palette } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  updateBlockField,
  updateBlockProperties,
} from "@/store/slices/blocksSlice";
import {
  BlockTypes,
  TextBlockItem,
  HeadingBlockItem,
  ButtonBlockItem,
  ImageBlockItem,
  ColumnsBlockItem,
  BlockItem,
  GeneralBlockProperties,
  LinkBlockItem,
} from "@/types/block";
import dynamic from "next/dynamic";
import LinkPropertiesPanel from "./properties-panels/LinkPropertiesPanel";
import { useCallback } from "react";

const TextPropertiesPanel = dynamic(
  () => import("@/components/sidebars/properties-panels/TextPropertiesPanel")
);
const HeadingPropertiesPanel = dynamic(
  () => import("@/components/sidebars/properties-panels/HeadingPropertiesPanel")
);
const ButtonPropertiesPanel = dynamic(
  () => import("@/components/sidebars/properties-panels/ButtonPropertiesPanel")
);
const ImagePropertiesPanel = dynamic(
  () => import("@/components/sidebars/properties-panels/ImagePropertiesPanel")
);
const DividerPropertiesPanel = dynamic(
  () => import("@/components/sidebars/properties-panels/DividerPropertiesPanel")
);
const SpacerPropertiesPanel = dynamic(
  () => import("@/components/sidebars/properties-panels/SpacerPropertiesPanel")
);
const ColumnsPropertiesPanel = dynamic(
  () => import("@/components/sidebars/properties-panels/ColumnsPropertiesPanel")
);

export function PropertiesPanel() {
  const dispatch = useAppDispatch();
  const { selectedBlock } = useAppSelector((s) => s.blocks);

  const onChange = useCallback(
    <T extends GeneralBlockProperties>(props: Partial<T>) => {
      if (!selectedBlock) return null;
      dispatch(
        updateBlockProperties({
          uuid: selectedBlock.uuid,
          updatedProperties: props,
        })
      );
    },
    [dispatch, selectedBlock?.uuid]
  );

  const onChangeBlockField = useCallback(
    <T extends BlockItem>(props: Partial<T>) => {
      if (!selectedBlock) return null;
      dispatch(
        updateBlockField({
          uuid: selectedBlock.uuid,
          updatedField: props,
        })
      );
    },
    [dispatch, selectedBlock?.uuid]
  );

  const renderPanel = () => {
    if (!selectedBlock) return null;
    switch (selectedBlock.type) {
      case BlockTypes.text:
        return (
          <TextPropertiesPanel
            block={selectedBlock as TextBlockItem}
            onChange={onChange}
          />
        );
      case BlockTypes.heading:
        return (
          <HeadingPropertiesPanel
            block={selectedBlock as HeadingBlockItem}
            onChange={onChange}
          />
        );
      case BlockTypes.button:
        return (
          <ButtonPropertiesPanel
            block={selectedBlock as ButtonBlockItem}
            onChange={onChange}
            onChangeBlockField={onChangeBlockField}
          />
        );
      case BlockTypes.image:
        return (
          <ImagePropertiesPanel
            block={selectedBlock as ImageBlockItem}
            onChange={onChange}
            onChangeBlockField={onChangeBlockField}
          />
        );
      case BlockTypes.divider:
        return (
          <DividerPropertiesPanel
            block={selectedBlock as BlockItem}
            onChange={onChange}
          />
        );
      case BlockTypes.spacer:
        return (
          <SpacerPropertiesPanel
            block={selectedBlock as BlockItem}
            onChange={onChange}
          />
        );
      case BlockTypes.columns:
        return (
          <ColumnsPropertiesPanel
            block={selectedBlock as ColumnsBlockItem}
            onChange={onChange}
            onChangeBlockField={onChangeBlockField}
          />
        );
      case BlockTypes.link:
        return (
          <LinkPropertiesPanel
            block={selectedBlock as LinkBlockItem}
            onChange={onChange}
            onChangeBlockField={onChangeBlockField}
          />
        );
      default:
        return null;
    }
  };

  return (
    <aside className="w-80 border-l border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">Properties</h2>
        {!selectedBlock && (
          <p className="text-xs text-muted-foreground mt-1">
            No element selected
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {!selectedBlock ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <Palette className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground max-w-[200px]">
              Select an element on the canvas to edit its properties
            </p>
          </div>
        ) : (
          <div className="space-y-6">{renderPanel()}</div>
        )}
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
