import "server-only";

import {
  applicationsStore,
  employeesStore,
  getApplicationStats,
  hrQueueStore,
  notificationsStore,
  servicesCatalog,
  type Application,
} from "@/lib/data/store";
import type { Role } from "@/lib/types";

/**
 * Server-side data access. When NEXT_PUBLIC_API_URL points to an external
 * backend, swap these implementations to fetch from that API with the
 * authenticated user context. Authorization must always happen here.
 */
export function listApplications(filters?: {
  tab?: string;
  q?: string;
  status?: string;
}): { items: Application[]; counts: Record<string, number> } {
  const all = applicationsStore;
  const counts = {
    all: all.length,
    needs: all.filter((item) => item.status === "clarification").length,
    drafts: all.filter((item) => item.status === "draft").length,
    done: all.filter(
      (item) => item.status === "done" || item.status === "approved",
    ).length,
  };

  let items = [...all];
  if (filters?.tab === "needs") {
    items = items.filter((item) => item.status === "clarification");
  } else if (filters?.tab === "drafts") {
    items = items.filter((item) => item.status === "draft");
  } else if (filters?.tab === "done") {
    items = items.filter(
      (item) => item.status === "done" || item.status === "approved",
    );
  }

  if (filters?.status && filters.status !== "all") {
    items = items.filter((item) => item.status === filters.status);
  }

  if (filters?.q) {
    const q = filters.q.toLowerCase();
    items = items.filter((item) =>
      `${item.id} ${item.service}`.toLowerCase().includes(q),
    );
  }

  return { items, counts };
}

export function getApplicationById(id: string): Application | null {
  return applicationsStore.find((item) => item.id === id) ?? null;
}

export function listServices(filters?: { q?: string; role?: Role | null }) {
  let items = [...servicesCatalog];
  if (filters?.role) {
    items = items.filter((service) => service.audience.includes(filters.role!));
  }
  if (filters?.q) {
    const q = filters.q.toLowerCase();
    items = items.filter((service) =>
      `${service.title} ${service.description}`.toLowerCase().includes(q),
    );
  }
  return items;
}

export function listNotifications(tab: "all" | "unread" = "all") {
  if (tab === "unread") {
    return notificationsStore.filter((item) => item.unread);
  }
  return [...notificationsStore];
}

export function getDashboardData() {
  return {
    stats: getApplicationStats(applicationsStore),
    recent: applicationsStore.slice(0, 2),
  };
}

export function listHrQueue() {
  return [...hrQueueStore];
}

export function listEmployees(filters?: { q?: string; unit?: string }) {
  let items = [...employeesStore];
  if (filters?.unit && filters.unit !== "all") {
    items = items.filter((item) => item.unit === filters.unit);
  }
  if (filters?.q) {
    const q = filters.q.toLowerCase();
    items = items.filter((item) =>
      `${item.name} ${item.unit} ${item.position}`.toLowerCase().includes(q),
    );
  }
  return items;
}
