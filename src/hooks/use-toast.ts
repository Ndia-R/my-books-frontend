import { TOAST_EVENT } from '@/components/ui/toaster';

type ToastEvent = {
  title?: string;
  description?: string;
};

const useToast = () => {
  const toast = (detail: ToastEvent) => {
    const event = new CustomEvent(TOAST_EVENT, { detail });
    document.dispatchEvent(event);
  };
  return { toast };
};

export { useToast, type ToastEvent };
