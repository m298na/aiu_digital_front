"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useActionFeedback } from "@/components/action-toast";
import {
  ErrorBlock,
  Field,
  LoadingBlock,
  PageHeader,
  StatusBadge,
} from "@/components/ui";
import { ApiError, getApplication } from "@/lib/api/client";
import type { Application } from "@/lib/data/store";

export default function ApplicationDetailPage() {
  const params = useParams<{ id: string }>();
  const id = decodeURIComponent(params.id);
  const [item, setItem] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const { notify, Feedback } = useActionFeedback();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getApplication(id)
      .then((data) => {
        if (cancelled) return;
        setItem(data);
        setError(null);
        setMissing(false);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) {
          setMissing(true);
        } else {
          setError(err.message || "Не удалось загрузить заявку");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (missing) {
    notFound();
  }

  if (loading) {
    return (
      <AppShell area="Заявки">
        <LoadingBlock label="Загружаем заявку…" />
      </AppShell>
    );
  }

  if (error || !item) {
    return (
      <AppShell area="Заявки">
        <ErrorBlock
          message={error ?? "Заявка не найдена"}
          onRetry={() => window.location.reload()}
        />
      </AppShell>
    );
  }

  if (item.id === "HR-0048") {
    return (
      <AppShell area="Заявки">
        <Feedback />
        <PageHeader
          eyebrow="Заявки / C07"
          title={`Заявка ${item.id}`}
          description={`Справка с места работы · Подана ${item.submittedAt}`}
          actions={<StatusBadge status={item.status} />}
        />
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="aiu-panel p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-700">
              Результат готов
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink">
              Справка с места работы
            </h2>
            <p className="mt-3 text-sm text-muted">
              Сформирована по выбранному назначению. Дата публикации:
              16.11.2026, 14:20.
            </p>
            <div className="mt-6 flex items-center justify-between gap-3 rounded-card border border-line bg-canvas/70 px-4 py-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-brand" />
                <div>
                  <p className="text-sm font-medium text-ink">
                    Справка_HR-0048.pdf
                  </p>
                  <p className="text-xs text-muted">PDF · 248 КБ · Проверено</p>
                </div>
              </div>
              <button
                type="button"
                className="aiu-btn-primary"
                onClick={() =>
                  notify("Скачивание зафиксировано. Файл будет доступен после проверки прав.")
                }
              >
                <Download className="h-4 w-4" />
                Скачать
              </button>
            </div>
          </div>
          <div className="aiu-panel space-y-4 p-6">
            <h3 className="font-display text-2xl text-ink">История заявки</h3>
            {[
              ["Подано", "14 ноября, 10:04"],
              ["В работе", "14 ноября, 10:16 · Кадровая служба"],
              ["Результат опубликован", "16 ноября, 14:20"],
            ].map(([title, meta]) => (
              <div key={title} className="border-l-2 border-brand/30 pl-4">
                <p className="text-sm font-medium text-ink">{title}</p>
                <p className="text-xs text-muted">{meta}</p>
              </div>
            ))}
            <p className="text-xs text-muted">
              Ссылка на скачивание выдаётся после проверки прав. Скачивание
              фиксируется.
            </p>
          </div>
        </div>
      </AppShell>
    );
  }

  if (item.id === "HR-0052") {
    return (
      <AppShell area="Заявки">
        <Feedback />
        <PageHeader
          eyebrow="Заявки / C08"
          title="Нужно уточнить данные"
          description={`Заявка ${item.id} · Срок ответа: 19 ноября`}
          actions={<StatusBadge status={item.status} />}
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="aiu-panel p-6">
            <h2 className="font-display text-2xl text-ink">
              Комментарий специалиста
            </h2>
            <p className="mt-3 text-sm text-muted">
              Укажите актуальное значение и приложите документ, подтверждающий
              изменение.
            </p>
          </div>
          <form
            className="aiu-panel space-y-4 p-6"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
              notify("Исправления отправлены. Заявка вернётся в работу.");
            }}
          >
            <h2 className="font-display text-2xl text-ink">Исправление заявки</h2>
            <Field label="Новое значение" htmlFor="new-value">
              <input
                id="new-value"
                name="newValue"
                className="aiu-input"
                defaultValue="+7 (000) 000-00-00"
                required
              />
            </Field>
            <Field label="Комментарий" htmlFor="comment">
              <textarea
                id="comment"
                name="comment"
                className="aiu-input min-h-24"
                defaultValue="Добавлен подтверждающий документ"
                required
              />
            </Field>
            <div className="rounded-card border border-line bg-canvas/70 px-4 py-3 text-sm">
              Подтверждение.pdf · Проверено
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="submit" className="aiu-btn-primary">
                Отправить исправления
              </button>
              <button
                type="button"
                className="aiu-btn-secondary"
                onClick={() => notify("Черновик исправлений сохранён локально.")}
              >
                Сохранить
              </button>
            </div>
            {sent ? (
              <p className="text-sm text-brand">
                Исправления отправлены. Заявка вернётся в работу.
              </p>
            ) : null}
          </form>
        </div>
      </AppShell>
    );
  }

  if (item.id === "DU-0021") {
    return (
      <AppShell area="Общежития">
        <PageHeader
          eyebrow="Общежития / S05"
          title={`Заявление ${item.id}`}
          description={`Кампания 2027/28 · Подано ${item.submittedAt}`}
          actions={<StatusBadge status={item.status} />}
        />
        <div className="aiu-panel p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-700">
            Заявление включено в очередь
          </p>
          <h2 className="mt-2 font-display text-3xl text-ink">
            Ожидайте назначения места
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Документы проверены. Распределение выполняется по опубликованным
            правилам кампании. Одобрение не означает назначение места.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/dormitory/campaign" className="aiu-btn-secondary">
              Посмотреть условия
            </Link>
            <Link href="/dormitory/placement" className="aiu-btn-primary">
              Посмотреть размещение
            </Link>
          </div>
        </div>
        <div className="mt-4 aiu-panel space-y-4 p-6">
          <h3 className="font-display text-2xl text-ink">История заявления</h3>
          {[
            ["Подано", "01 июля, 10:14"],
            ["На проверке", "02 июля, 09:30"],
            ["Одобрено", "03 июля, 16:10 · Включено в очередь"],
          ].map(([title, meta]) => (
            <div key={title} className="border-l-2 border-brand/30 pl-4">
              <p className="text-sm font-medium text-ink">{title}</p>
              <p className="text-xs text-muted">{meta}</p>
            </div>
          ))}
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell area="Заявки">
      <Feedback />
      <PageHeader
        eyebrow="Заявки"
        title={`Заявка ${item.id}`}
        description={`${item.service} · ${item.updated}`}
        actions={<StatusBadge status={item.status} />}
      />
      <div className="aiu-panel p-6">
        <p className="text-sm text-muted">
          Следующий шаг: {item.nextStep}. Срок: {item.due}.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/applications" className="aiu-btn-secondary">
            Ко всем заявкам
          </Link>
          {item.status === "draft" ? (
            <button
              type="button"
              className="aiu-btn-primary"
              onClick={() => notify("Черновик сохранён. Продолжите оформление позже.")}
            >
              Продолжить оформление
            </button>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}
