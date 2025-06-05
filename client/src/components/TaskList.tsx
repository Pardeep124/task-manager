import React from 'react';
import type { Task } from '../types/Task';
import TaskItem from './TaskItem';

interface TaskListProps {
    tasks: Task[] | undefined;
    isLoading: boolean;
    error: any;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, error, isLoading, onEdit, onDelete }) => {

    if (error) return <p className="text-red-500 text-center mt-8">Failed to load tasks.</p>;
    if (isLoading) return <p className="text-center mt-8">Loading tasks...</p>;
    if (tasks?.length === 0)
        return (
            <div className="text-center p-4 text-gray-600">
                No tasks found. Add some tasks!
            </div>
        );

    return (
        <ul className="">
            {tasks?.map((task: any) => <TaskItem task={task} onDelete={onDelete} onEdit={onEdit} />)}
        </ul>
    );
};

export default TaskList;
