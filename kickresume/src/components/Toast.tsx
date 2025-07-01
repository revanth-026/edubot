import { useToast } from '../contexts/ToastContext';

const Toast = () => {
  const { toast, hideToast } = useToast();

  if (!toast.visible) return null;

  const color = toast.type === 'success' ? 'bg-green-500' : 'bg-[#FF6B6B]';

  return (
    <div className={`fixed top-6 right-6 text-white px-6 py-3 rounded-lg shadow-lg z-50 ${color}`}>
      {toast.message}
      <button className="ml-4 font-bold" onClick={hideToast}>✕</button>
    </div>
  );
};

export default Toast;
