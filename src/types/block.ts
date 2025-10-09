export interface BlockItem {
  id: string;
  type: string;
  icon: React.FC;
  label: string;
  description: string;
  properties: {
    backgroundColor?: string;
    padding?: string | number;
    margin?: string | number;
    borderRadius?: string | number;
    borderColor?: string;
    borderWidth?: string | number;
    fontSize?: string | number;
    fontWeight?: string | number;
    color?: string;
  };
}
