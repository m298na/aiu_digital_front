"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4">
      <h1 className="font-display text-3xl text-ink">Что-то пошло не так</h1>
      <p className="mt-3 text-sm text-muted">
        {error.message || "Не удалось отобразить страницу."}
      </p>
      <button type="button" className="aiu-btn-primary mt-6 w-fit" onClick={reset}>
        Попробовать снова
      </button>
    </div>
  );
}
