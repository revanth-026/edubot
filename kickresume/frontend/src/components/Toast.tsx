import React from 'react';
import { useToast } from '../contexts/ToastContext';

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-50 space-y-3">
      {toasts.map((toast) => {
        let color =
          toast.type === 'success'
            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-l-4 border-green-500'
            : toast.type === 'error'
            ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-l-4 border-red-500'
            : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-l-4 border-blue-500';

        return (
          <div
            key={toast.id}
            className={`px-6 py-3 rounded-lg shadow-lg flex justify-between items-center transition-colors duration-300 ${color}`}
          >
            <span>{toast.message}</span>
            <button
              className="ml-4 font-bold hover:opacity-70 transition-opacity duration-200"
              onClick={() => removeToast(toast.id)}
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
