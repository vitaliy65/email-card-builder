import { BlockPreviewItem } from "@/types/blockPreview";
import { BlockTypes } from "@/types/block";
import {
  Type,
  Heading1,
  MousePointerClick,
  ImageIcon,
  Minus,
  Space,
  Columns2,
  Link,
} from "lucide-react";

export const blockPreviews: BlockPreviewItem[] = [
  {
    id: BlockTypes.text,
    type: BlockTypes.text,
    icon: Type,
    label: "Text",
    description: "Add paragraph text",
  },
  {
    id: BlockTypes.heading,
    type: BlockTypes.heading,
    icon: Heading1,
    label: "Heading",
    description: "Add a heading",
  },
  {
    id: BlockTypes.button,
    type: BlockTypes.button,
    icon: MousePointerClick,
    label: "Button",
    description: "Add a CTA button",
  },
  {
    id: BlockTypes.image,
    type: BlockTypes.image,
    icon: ImageIcon,
    label: "Image",
    description: "Add an image",
  },
  {
    id: BlockTypes.divider,
    type: BlockTypes.divider,
    icon: Minus,
    label: "Divider",
    description: "Add a horizontal line",
  },
  {
    id: BlockTypes.spacer,
    type: BlockTypes.spacer,
    icon: Space,
    label: "Spacer",
    description: "Add vertical space",
  },
  {
    id: BlockTypes.columns,
    type: BlockTypes.columns,
    icon: Columns2,
    label: "Columns",
    description: "Add column layout",
  },
  {
    id: BlockTypes.link,
    type: BlockTypes.link,
    icon: Link,
    label: "Link",
    description: "Add a link",
  },
];
