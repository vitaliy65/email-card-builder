import { BlockTypes } from "./block";

export interface BlockPreviewItem {
  id: BlockTypes;
  type: BlockTypes;
  icon: React.FC;
  label: string;
  description: string;
}
