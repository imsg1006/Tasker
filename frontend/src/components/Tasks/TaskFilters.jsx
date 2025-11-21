export default function TaskFilters({ filter, onFilterChange, tasks }) {
  const getStats = () => {
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in_progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    
    return { completed, inProgress, pending };
  };

  const stats = getStats();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Filters</h2>
      <div className="space-y-2">
        {['all', 'pending', 'in_progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => onFilterChange(status)}
            className={`w-full text-left px-4 py-2 rounded-lg transition capitalize font-medium ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {status === 'all' ? 'All Tasks' : status.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Task Stats</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Tasks:</span>
            <span className="font-semibold">{tasks.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Completed:</span>
            <span className="font-semibold text-green-600">{stats.completed}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">In Progress:</span>
            <span className="font-semibold text-blue-600">{stats.inProgress}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Pending:</span>
            <span className="font-semibold text-yellow-600">{stats.pending}</span>
          </div>
        </div>
      </div>
    </div>
  );
}