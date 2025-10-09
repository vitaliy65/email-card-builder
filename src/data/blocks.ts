import TextBlock from "@/components/blocks/TextBlock";
import HeadingBlock from "@/components/blocks/HeadingBlock";
import ButtonBlock from "@/components/blocks/ButtonBlock";
import ImageBlock from "@/components/blocks/ImageBlock";
import DividerBlock from "@/components/blocks/DividerBlock";
import SpacerBlock from "@/components/blocks/SpacerBlock";
import ColumnsBlock from "@/components/blocks/ColumnsBlock";
import { BlockItem } from "@/types/block";
import {
  Type,
  Heading1,
  MousePointerClick,
  ImageIcon,
  Minus,
  Space,
  Columns2,
} from "lucide-react";

export const blocks: BlockItem[] = [
  {
    id: "text",
    type: "text",
    icon: Type,
    label: "Text",
    description: "Add paragraph text",
    canvasItem: TextBlock,
  },
  {
    id: "heading",
    type: "heading",
    icon: Heading1,
    label: "Heading",
    description: "Add a heading",
    canvasItem: HeadingBlock,
  },
  {
    id: "button",
    type: "button",
    icon: MousePointerClick,
    label: "Button",
    description: "Add a CTA button",
    canvasItem: ButtonBlock,
  },
  {
    id: "image",
    type: "image",
    icon: ImageIcon,
    label: "Image",
    description: "Add an image",
    canvasItem: ImageBlock,
  },
  {
    id: "divider",
    type: "divider",
    icon: Minus,
    label: "Divider",
    description: "Add a horizontal line",
    canvasItem: DividerBlock,
  },
  {
    id: "spacer",
    type: "spacer",
    icon: Space,
    label: "Spacer",
    description: "Add vertical space",
    canvasItem: SpacerBlock,
  },
  {
    id: "columns",
    type: "columns",
    icon: Columns2,
    label: "Columns",
    description: "Add column layout",
    canvasItem: ColumnsBlock,
  },
];
