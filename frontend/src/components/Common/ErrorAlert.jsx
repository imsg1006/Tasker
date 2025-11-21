import { X } from 'lucide-react';

export default function ErrorAlert({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 flex items-center gap-2">
      <span>{message}</span>
      <button onClick={onClose} className="hover:text-red-900">
        <X size={18} />
      </button>
    </div>
  );
}