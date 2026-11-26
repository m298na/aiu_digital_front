import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4">
      <h1 className="font-display text-3xl text-ink">Страница не найдена</h1>
      <p className="mt-3 text-sm text-muted">
        Запись отсутствует или у вас нет доступа.
      </p>
      <Link href="/" className="aiu-btn-primary mt-6 w-fit">
        На главную
      </Link>
    </div>
  );
}
