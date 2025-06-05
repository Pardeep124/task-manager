import type { Task } from "../types/Task";
import api from "../utils/api";


export async function createTask(data: Partial<Task>) {
  const res = await api.post('/tasks', data);
  return res.data;
}

export async function getTasks() {
  const res = await api.get('/tasks');
  return res.data;
}

export async function updateTask(id: string, data: Partial<Task>) {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data;
}

export async function deleteTask(id: string) {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
}
