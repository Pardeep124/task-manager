import useSWR from "swr";
import { getTasks } from "../services/task.services";

export const useTasks = () => {
  const { data, error, isLoading, mutate } = useSWR("/tasks", getTasks);
  return { tasks: data?.data, error, isLoading, mutate };
};
