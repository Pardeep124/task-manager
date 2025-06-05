import React, { useState } from "react";
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"
import type { Task } from "../types/Task";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { createTask, deleteTask, updateTask } from "../services/task.services";
import toast from "react-hot-toast";

const Dashboard: React.FC = () => {
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const { data: tasks, isLoading, error, mutate } = useSWR<Task[]>('/tasks', fetcher);

    const handleEdit = (task: Task) => {
        setEditingTask(task);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTask(id);
            mutate();
            toast.success("Task deleted");
        } catch {
            toast.error("Failed to delete task");
        }
    };

    const handleCancel = () => {
        setEditingTask(null);
    };

    const handleSubmit = async (data: Partial<Task>) => {
        setIsSaving(true);
        try {
            if (editingTask) {
                await updateTask(editingTask._id as string, data);
            } else {
                await createTask(data);
            }
            await mutate();
            setEditingTask(null);
            toast.success('Task saved successfully!');
        } catch (error: any) {
            const message =
                error.response?.data?.message ||
                error.message ||
                'Failed to save task. Please try again.';
            toast.error(message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 bg-white p-4 rounded shadow">
                    <TaskForm
                        initialData={editingTask}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        loading={isSaving}
                    />
                </div>

                <div className="md:col-span-2 bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-4">Task List</h2>
                    <TaskList tasks={tasks} error={error} isLoading={isLoading} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
