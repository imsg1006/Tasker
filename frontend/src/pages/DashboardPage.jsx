import { useState, useEffect } from 'react';
import Navbar from '../components/Common/Navbar';
import TaskForm from '../components/Tasks/TaskForm';
import TaskCard from '../components/Tasks/TaskCard';
import TaskFilters from '../components/Tasks/TaskFilters';
import { useTasks } from '../hooks/useTasks';

export default function DashboardPage() {
  const { tasks, loading, createTask, updateTask, deleteTask, fetchTasks } = useTasks();
  const [filter, setFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchTasks(filter === 'all' ? null : filter);
  }, [filter]);

  const handleAddTask = async (taskData) => {
    try {
      await createTask(taskData);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      await updateTask(taskId, updates);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block md:col-span-1`}>
            <TaskFilters
              filter={filter}
              onFilterChange={setFilter}
              tasks={tasks}
            />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <TaskForm onAdd={handleAddTask} isLoading={loading} />

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {filter === 'all' ? 'All Tasks' : filter.replace('_', ' ')} ({filteredTasks.length})
              </h2>

              {filteredTasks.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <p className="text-gray-500 text-lg">
                    No tasks yet. Create one to get started!
                  </p>
                </div>
              ) : (
                filteredTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdate={handleUpdateTask}
                    onDelete={handleDeleteTask}
                    isLoading={loading}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}