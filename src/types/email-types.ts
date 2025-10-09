export type BlockType =
  | "text"
  | "heading"
  | "button"
  | "image"
  | "divider"
  | "spacer"
  | "columns";

export interface EmailBlock {
  id: string;
  type: BlockType;
  content?: string;
  styles?: {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    textAlign?: "left" | "center" | "right";
    borderRadius?: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties?: Record<string, any>;
}

export interface EmailTemplate {
  id: string;
  name: string;
  blocks: EmailBlock[];
  settings: {
    width: number;
    backgroundColor: string;
  };
}
