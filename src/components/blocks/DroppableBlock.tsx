import React from "react";
import Droppable from "../block-states/Droppable";
import { PlusCircle } from "lucide-react";

// DroppableBlock is a wrapper component that renders a droppable area with some styling.
// It uses the Droppable component from block-states/Droppable and displays a PlusCircle icon.
export default function DroppableBlock({ id }: { id: string }) {
  return (
    // The Droppable area receives a unique id and customized styles for appearance.
    <Droppable
      className="bg-blue-200 flex justify-center items-center border-2 border-blue-500 border-dashed rounded-sm p-2 w-full flex-1 h-[100px] mb-2"
      id={id}
    >
      {/* PlusCircle icon represents the vacant area for dropping items */}
      <div className="bg-blue-500 text-white p-4 rounded-xl">
        <PlusCircle />
      </div>
    </Droppable>
  );
}
