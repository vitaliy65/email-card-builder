import { BlockItem, BlockTypes } from "@/types/block";
import ColumnBlockContainer from "../block-handlers/block-column-container";
import { blockComponents } from "@/data/blockComponents";
import DroppableBlock from "../DroppableBlock";

export function ColumnBlockCell({
  columnUUID,
  uuid,
  col_idx,
  row_idx,
  cellContent,
}: {
  columnUUID: string;
  uuid?: string;
  col_idx: number;
  row_idx: number;
  cellContent: BlockItem | null;
}) {
  if (cellContent) {
    const blockType = cellContent.type as BlockTypes;
    const BlockComponent = blockComponents[blockType];
    if (!BlockComponent) return null;
    return (
      <ColumnBlockContainer
        columnUUID={columnUUID}
        cell={cellContent}
        col_idx={col_idx}
        row_idx={row_idx}
      >
        <BlockComponent props={cellContent} />
      </ColumnBlockContainer>
    );
  }
  return <DroppableBlock id={`cell_${columnUUID}_${row_idx}_${col_idx}`} />;
}
