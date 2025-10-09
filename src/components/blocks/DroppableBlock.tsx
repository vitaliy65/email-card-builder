import React from "react";
import Droppable from "../block-states/Droppable";
import { PlusCircle } from "lucide-react";

export default function DroppableBlock({ id }: { id: string }) {
  return (
    <Droppable
      className="bg-blue-200 flex justify-center items-center border border-blue-500 border-dashed rounded-sm p-2 w-full flex-1 h-[100px] mb-2"
      id={id}
    >
      <PlusCircle className="text-blue-700" />
    </Droppable>
  );
}
