import { useDroppable } from "@dnd-kit/react";
import React from "react";

const Droppable = ({ id, title, children }) => {
  const { ref, isDropTarget } = useDroppable({
    id,
    data: {
      type: 'column',
    },
  });

  console.log('isDropTarget ', isDropTarget)

  return (
    <div
      ref={ref}
      className={`flex flex-col rounded-xl border min-h-[52vh] transition
        ${isDropTarget ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'}`}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
          {React.Children.count(children)}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        {children || (
          <div className="text-sm text-gray-400 text-center py-6">
            No tasks
          </div>
        )}
      </div>
    </div>
  );
}

export default Droppable;