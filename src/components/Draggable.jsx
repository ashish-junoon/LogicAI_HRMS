import { useDraggable } from "@dnd-kit/react";
import Chip from "./utils/Chip";

const Draggable = ({ task, columnId }) => {
    const { ref } = useDraggable({
        id: task.id,
        // modifiers: [RestrictToHorizontalAxis],
        data: {
            ...task,
            column: columnId,
            type: 'task'
        },
    });

    // color map
    const colorMap = {
        low: 'green',
        medium: 'yellow',
        high: 'red'
    }

    return (
        <div
            ref={ref}
            className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition"
        >
            <div className="text-sm font-medium text-gray-800">
                {task?.title}
            </div>

            <div className="text-xs text-gray-500 mt-1">
                Due: Today
            </div>

            <div className="flex items-center justify-between mt-3">
                <Chip title={task?.priority} color={colorMap[task?.priority?.toLowerCase()]} />
                {/* <div className="w-6 h-6 rounded-full bg-gray-300" /> */}
            </div>
        </div>
    );
}

export default Draggable;