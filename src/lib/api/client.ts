import type { Application, NotificationItem, ServiceItem } from "@/lib/data/store";
import type { Role } from "@/lib/types";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function resolveUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
  if (path.startsWith("http")) return path;
  if (base) return `${base}${path}`;
  return path;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(resolveUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let message = response.statusText;
    try {
      const body = (await response.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      /* ignore */
    }
    throw new ApiError(message || "Request failed", response.status);
  }

  return response.json() as Promise<T>;
}

export function getApplications(params?: {
  tab?: string;
  q?: string;
  status?: string;
}) {
  const search = new URLSearchParams();
  if (params?.tab) search.set("tab", params.tab);
  if (params?.q) search.set("q", params.q);
  if (params?.status) search.set("status", params.status);
  const qs = search.toString();
  return request<{
    items: Application[];
    counts: {
      all: number;
      needs: number;
      drafts: number;
      done: number;
    };
  }>(`/api/applications${qs ? `?${qs}` : ""}`);
}

export function getApplication(id: string) {
  return request<Application>(`/api/applications/${encodeURIComponent(id)}`);
}

export function getServices(params?: { q?: string; role?: Role }) {
  const search = new URLSearchParams();
  if (params?.q) search.set("q", params.q);
  if (params?.role) search.set("role", params.role);
  const qs = search.toString();
  return request<{ items: ServiceItem[] }>(
    `/api/services${qs ? `?${qs}` : ""}`,
  );
}

export function getNotifications(tab: "all" | "unread" = "all") {
  return request<{ items: NotificationItem[] }>(
    `/api/notifications?tab=${tab}`,
  );
}

export function getDashboard() {
  return request<{
    stats: {
      active: number;
      needsResponse: number;
      done: number;
      drafts: number;
      unreadNotifications: number;
    };
    recent: Application[];
  }>("/api/dashboard");
}

export function getHrQueue() {
  return request<{ items: typeof import("@/lib/data/store").hrQueueStore }>(
    "/api/hr/queue",
  );
}

export function getEmployees(params?: { q?: string; unit?: string }) {
  const search = new URLSearchParams();
  if (params?.q) search.set("q", params.q);
  if (params?.unit) search.set("unit", params.unit);
  const qs = search.toString();
  return request<{ items: typeof import("@/lib/data/store").employeesStore }>(
    `/api/hr/employees${qs ? `?${qs}` : ""}`,
  );
}

export function getRooms(params?: { q?: string; floor?: string }) {
  const search = new URLSearchParams();
  if (params?.q) search.set("q", params.q);
  if (params?.floor) search.set("floor", params.floor);
  const qs = search.toString();
  return request<{ items: string[] }>(`/api/operator/rooms${qs ? `?${qs}` : ""}`);
}

export function getDormQueue() {
  return request<{ items: typeof import("@/lib/data/store").dormQueueStore }>(
    "/api/operator/queue",
  );
}

export function getPlacements() {
  return request<{
    items: typeof import("@/lib/data/store").placementsStore;
  }>("/api/operator/placements");
}

export function getScience() {
  return request<{ items: typeof import("@/lib/data/store").scienceStore }>(
    "/api/science",
  );
}

export function getStudents() {
  return request<{ items: typeof import("@/lib/data/store").studentsStore }>(
    "/api/students",
  );
}
