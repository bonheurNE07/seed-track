import { useEffect, useState } from 'react';
import { Info, X } from 'lucide-react';

export default function Notification({ message }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 40000); // Auto-close after 2 minutes
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4 flex items-start space-x-3 text-sm text-gray-700 dark:text-gray-300 relative">
      <Info className="w-5 h-5 text-gray-500 mt-1" />
      <p className="flex-1">{message}</p>
      <button
        onClick={() => setVisible(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
      >
        <X size={16} />
      </button>
    </div>
  );
}
