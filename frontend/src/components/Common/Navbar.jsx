import { LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold text-blue-600">TaskHub</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">
            {user?.full_name || user?.username}
          </span>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}