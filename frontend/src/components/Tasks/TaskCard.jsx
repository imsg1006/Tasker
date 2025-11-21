import { useState } from 'react';
import { Trash2, Edit2 } from 'lucide-react';

export default function TaskCard({ task, onUpdate, onDelete, isLoading }) {
  const [isEditing, setIsEditing] = useState(false);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  };

  const priorityColors = {
    low: 'text-gray-600',
    medium: 'text-orange-600',
    high: 'text-red-600'
  };

  const handleStatusChange = (newStatus) => {
    onUpdate(task.id, { status: newStatus });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
          {task.description && (
            <p className="text-gray-600 text-sm mt-1">{task.description}</p>
          )}
        </div>
        <button
          onClick={() => onDelete(task.id)}
          disabled={isLoading}
          className="text-red-500 hover:text-red-700 ml-2 transition disabled:opacity-50"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[task.status]}`}>
          {task.status.replace('_', ' ')}
        </span>

        <span className={`text-sm font-medium ${priorityColors[task.priority]} capitalize`}>
          {task.priority} Priority
        </span>

        {isEditing ? (
          <div className="flex gap-2 flex-wrap">
            {['pending', 'in_progress', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                disabled={isLoading}
                className={`px-3 py-1 rounded text-sm font-medium transition disabled:opacity-50 ${
                  task.status === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 transition"
          >
            <Edit2 size={16} /> Edit
          </button>
        )}
      </div>
    </div>
  );
}