import React from 'react';
import type { Task } from '../types/Task';

interface TaskItemProps {
    task: Required<Task>;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
}

const priorityColors = {
    High: 'border-red-500 bg-red-50 text-red-700',
    Medium: 'border-yellow-500 bg-yellow-50 text-yellow-700',
    Low: 'border-green-500 bg-green-50 text-green-700',
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
    const priorityClass = priorityColors[task.priority] || 'border-gray-300 bg-white';

    return (
        <div
            key={task?._id}
            className={`border-l-4 p-4 mb-3 rounded shadow-sm transition ${priorityClass}`}
        >
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            {task.dueDate && (
                <span className="text-xs text-blue-400 font-medium mt-1">
                    📅 Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
            )}
            <div className="flex justify-between mt-2">
                <span className="text-xs font-semibold uppercase">{task.priority}</span>
                <div>
                    <button
                        onClick={() => onEdit(task)}
                        className="text-blue-500 hover:underline mr-2"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="text-red-500 hover:underline"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
