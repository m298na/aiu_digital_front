"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Field, PageHeader, StatusBadge } from "@/components/ui";
import { applications } from "@/lib/demo-data";

export default function ApplicationDetailPage() {
  const params = useParams<{ id: string }>();
  const id = decodeURIComponent(params.id);
  const item = applications.find((entry) => entry.id === id) ?? applications[0];
  const [sent, setSent] = useState(false);

  if (item.id === "HR-0048") {
    return (
      <AppShell area="Заявки">
        <PageHeader
          eyebrow="Заявки / C07"
          title={`Заявка ${item.id}`}
          description="Справка с места работы · Подана 14.11.2026"
          actions={<StatusBadge status="done" />}
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
              <button type="button" className="aiu-btn-primary">
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
        <PageHeader
          eyebrow="Заявки / C08"
          title="Нужно уточнить данные"
          description={`Заявка ${item.id} · Срок ответа: 19 ноября`}
          actions={<StatusBadge status="clarification" />}
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
            }}
          >
            <h2 className="font-display text-2xl text-ink">Исправление заявки</h2>
            <Field label="Новое значение">
              <input className="aiu-input" defaultValue="+7 (000) 000-00-00" />
            </Field>
            <Field label="Комментарий">
              <textarea
                className="aiu-input min-h-24"
                defaultValue="Добавлен подтверждающий документ"
              />
            </Field>
            <div className="rounded-card border border-line bg-canvas/70 px-4 py-3 text-sm">
              Подтверждение.pdf · Проверено
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="submit" className="aiu-btn-primary">
                Отправить исправления
              </button>
              <button type="button" className="aiu-btn-secondary">
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
          description="Кампания 2027/28 · Подано 01 июля, 10:14"
          actions={<StatusBadge status="approved" />}
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
        <Link href="/applications" className="aiu-btn-secondary mt-6 inline-flex">
          Ко всем заявкам
        </Link>
      </div>
    </AppShell>
  );
}
