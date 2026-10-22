import { useEffect, useState } from "react";
import { TOAST_EVENT } from "../lib/toast";

const VISIBLE_MS = 2600;

export function Toaster() {
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (event: Event) => {
      clearTimeout(timer);
      setToast({ id: Date.now(), message: (event as CustomEvent<string>).detail });
      timer = setTimeout(() => setToast(null), VISIBLE_MS);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
      {toast && (
        <p
          key={toast.id}
          className="animate-rise-in rounded-xl border border-accent/30 bg-bg/95 px-6 py-3.5 font-mono text-base text-fg shadow-2xl shadow-black/30 backdrop-blur"
        >
          {toast.message}
        </p>
      )}
    </div>
  );
}
