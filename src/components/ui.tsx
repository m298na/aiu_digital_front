"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  ApplicationStatus,
  pluralizeRecords,
  statusLabels,
  statusStyles,
} from "@/lib/types";
import { isDemoMode } from "@/lib/config";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="animate-rise">
        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={cn("status-pill", statusStyles[status])}>
      {statusLabels[status]}
    </span>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="aiu-panel p-5">
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted">
        {label}
      </p>
      <p className="mt-3 font-display text-3xl text-ink">{value}</p>
      {hint ? <p className="mt-2 text-sm text-muted">{hint}</p> : null}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
  href,
}: {
  title: string;
  description: string;
  actionLabel: string;
  href: string;
}) {
  return (
    <div className="aiu-panel flex flex-col items-start gap-4 p-8">
      <div>
        <h2 className="font-display text-2xl text-ink">{title}</h2>
        <p className="mt-2 max-w-lg text-sm text-muted">{description}</p>
      </div>
      <Link href={href} className="aiu-btn-primary">
        {actionLabel}
      </Link>
    </div>
  );
}

export function DemoBanner() {
  if (!isDemoMode()) return null;
  return (
    <div className="mb-4 rounded-card border border-accent/40 bg-accent-soft px-4 py-3 text-sm text-ink">
      AIU Digital University · Демо-режим · Данные и SSO могут быть
      демонстрационными
    </div>
  );
}

export function DataTable({
  columns,
  rows,
  empty,
}: {
  columns: string[];
  rows: ReactNode[][];
  empty?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="aiu-panel p-8 text-sm text-muted">
        {empty ?? "Нет записей для отображения."}
      </div>
    );
  }

  return (
    <div className="aiu-panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line bg-canvas/70 text-xs uppercase tracking-[0.08em] text-muted">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-4 py-3 font-medium">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-line/70 last:border-0 hover:bg-canvas/50"
              >
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3 align-middle">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-line px-4 py-3 text-xs text-muted">
        Показано {rows.length} {pluralizeRecords(rows.length)}
        {isDemoMode() ? " · Демонстрационные данные" : null}
      </div>
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
  htmlFor,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
  htmlFor?: string;
}) {
  return (
    <label className="block" htmlFor={htmlFor}>
      <span className="aiu-label">{label}</span>
      {children}
      {hint ? <span className="mt-1.5 block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

export function LoadingBlock({ label = "Загружаем данные…" }: { label?: string }) {
  return (
    <div className="aiu-panel animate-pulse p-8 text-sm text-muted">{label}</div>
  );
}

export function ErrorBlock({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="aiu-panel border-red-200 bg-red-50 p-6 text-sm text-red-800">
      <p>{message}</p>
      {onRetry ? (
        <button type="button" className="aiu-btn-secondary mt-4" onClick={onRetry}>
          Повторить
        </button>
      ) : null}
    </div>
  );
}
