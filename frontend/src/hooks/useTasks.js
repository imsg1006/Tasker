import { useState, useCallback } from 'react';
import { taskService } from '../services/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (status = null) => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getTasks(status);
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    try {
      setError(null);
      const newTask = await taskService.createTask(taskData);
      setTasks([...tasks, newTask]);
      return newTask;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create task');
      throw err;
    }
  }, [tasks]);

  const updateTask = useCallback(async (taskId, taskData) => {
    try {
      setError(null);
      const updatedTask = await taskService.updateTask(taskId, taskData);
      setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
      return updatedTask;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update task');
      throw err;
    }
  }, [tasks]);

  const deleteTask = useCallback(async (taskId) => {
    try {
      setError(null);
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete task');
      throw err;
    }
  }, [tasks]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};