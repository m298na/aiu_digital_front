"use client";

import { useEffect, useState } from "react";

export function useActionFeedback() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), 3200);
    return () => window.clearTimeout(timer);
  }, [message]);

  return {
    message,
    notify: (text: string) => setMessage(text),
    Feedback: () =>
      message ? (
        <div
          role="status"
          className="fixed bottom-4 right-4 z-50 max-w-sm rounded-card border border-line bg-white px-4 py-3 text-sm text-ink shadow-lg"
        >
          {message}
        </div>
      ) : null,
  };
}
