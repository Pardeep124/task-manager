import React, { useState, useEffect } from 'react';
import type { Task } from '../types/Task';
import { getTaskAISuggestions } from '../services/ai-suggest.services';
import toast from 'react-hot-toast';

interface TaskFormProps {
  initialData?: Task | null;
  onSubmit: (task: Partial<Task>) => void;
  onCancel?: () => void;
  loading?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit, onCancel, loading }) => {

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    dueDate: initialData?.dueDate ? initialData.dueDate.slice(0, 10) : '',
    priority: initialData?.priority || 'Medium',
    tags: initialData?.tags?.join(', ') || ''
  })

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleAISuggestions = async () => {
    if (!formData.title && !formData.description) {
      alert('Please enter title or description first');
      return;
    }

    try {
      const aiSuggestions = await getTaskAISuggestions({
        title: formData.title || '',
        description: formData.description || '',
      });
      setFormData({
        ...formData,
        priority: aiSuggestions.priority,
        tags: aiSuggestions.tags.join(', '),
      });

      toast.success('AI suggestions applied!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to get AI suggestions.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: formData.title.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
      description: formData?.description
    });
  };

  useEffect(() => {
    setFormData({
      title: initialData?.title || '',
      description: initialData?.description || "",
      dueDate: initialData?.dueDate ? initialData.dueDate.slice(0, 10) : '',
      priority: initialData?.priority || 'Medium',
      tags: initialData?.tags?.join(', ') || ''
    })
  }, [initialData, loading]);

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">{initialData ? 'Edit Task' : 'Add Task'}</h2>
      <label className="block mb-2 font-medium">Title<span className="text-red-500">*</span></label>
      <input
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label className="block mb-2 font-medium">Description<span className="text-red-500">*</span></label>
      <input
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <button
        type="button"
        onClick={handleAISuggestions}
        className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition"
      >
        Get AI Suggestions
      </button>

      <label className="block mb-2 font-medium">Priority</label>
      <select
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.priority}
        name="priority"
        onChange={handleChange}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <label className="block mb-2 font-medium">Due Date</label>
      <input
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="date"
        value={formData.dueDate}
        name="dueDate"
        onChange={handleChange}
      />

      <label className="block mb-2 font-medium">Tags (comma separated)</label>
      <input
        className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        value={formData.tags}
        name="tags"
        onChange={handleChange}
      />

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;

