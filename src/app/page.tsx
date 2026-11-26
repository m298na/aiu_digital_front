"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { DEMO_PROFILES, type DemoProfileId } from "@/lib/auth/demo-profiles";
import { homeForRole } from "@/lib/routing";
import { useSession } from "@/lib/session";

const showDevLogin =
  process.env.NEXT_PUBLIC_ALLOW_DEV_LOGIN === "true" ||
  process.env.NODE_ENV !== "production";

const oidcEnabled = process.env.NEXT_PUBLIC_OIDC_ENABLED === "true";
const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export default function LoginPage() {
  const router = useRouter();
  const { ready, signedIn, role, roles, signInDev, signInOidc } = useSession();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) return;
    if (signedIn && role) router.replace(homeForRole(role));
    else if (signedIn && roles.length) router.replace("/role");
  }, [ready, signedIn, role, roles, router]);

  async function handleDev(profileId: DemoProfileId) {
    setPending(true);
    setError(null);
    try {
      await signInDev(profileId);
    } catch {
      setError("Не удалось выполнить вход.");
      setPending(false);
    }
  }

  return (
    <div className="aiu-shell">
      <div className="mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[1.15fr_0.85fr]">
        <section className="relative overflow-hidden px-6 py-10 sm:px-10 lg:px-16 lg:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(210,174,109,0.22),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(57,49,133,0.18),transparent_40%)]" />
          <div className="relative flex h-full max-w-xl flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Astana International University
              </p>
              <h1 className="mt-6 font-display text-5xl leading-[1.05] text-ink sm:text-6xl">
                Ваш университет.
                <br />
                В одном пространстве.
              </h1>
              <p className="mt-5 max-w-md text-base text-muted sm:text-lg">
                Услуги, документы и общежитие — с понятным статусом на каждом
                шаге.
              </p>
            </div>
            <p className="mt-12 text-sm text-muted">Язык интерфейса: русский</p>
          </div>
        </section>

        <section className="flex items-center justify-center bg-white/70 px-6 py-12 backdrop-blur lg:px-12">
          <div className="aiu-panel w-full max-w-md animate-rise p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              Добро пожаловать
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink">
              Войдите через учётную запись университета
            </h2>
            <p className="mt-3 text-sm text-muted">
              Пароль вводится только на странице университетского провайдера
              входа. Сессия хранится в защищённой httpOnly cookie.
            </p>

            {oidcEnabled ? (
              <button
                type="button"
                className="aiu-btn-primary mt-8 w-full"
                disabled={pending}
                onClick={() => {
                  setPending(true);
                  void signInOidc();
                }}
              >
                Войти через университетский SSO
              </button>
            ) : null}

            {showDevLogin ? (
              <div className="mt-6 space-y-3">
                {!oidcEnabled ? (
                  <p className="text-sm text-muted">
                    OIDC не настроен. Доступен серверный dev-вход с фиксированными
                    профилями (роли выдаёт сервер).
                  </p>
                ) : (
                  <p className="text-sm text-muted">Dev-профили для локальной проверки</p>
                )}
                <div className="grid gap-2">
                  {(Object.keys(DEMO_PROFILES) as DemoProfileId[]).map((id) => {
                    const profile = DEMO_PROFILES[id];
                    return (
                      <button
                        key={id}
                        type="button"
                        disabled={pending}
                        className="aiu-btn-secondary w-full justify-between"
                        onClick={() => void handleDev(id)}
                      >
                        <span>{profile.label}</span>
                        <span className="text-xs text-muted">
                          {profile.roles.join(", ")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {!oidcEnabled && !showDevLogin ? (
              <p className="mt-6 text-sm text-red-700">
                Вход недоступен: настройте AUTH_OIDC_* или AUTH_ALLOW_DEV_LOGIN.
              </p>
            ) : null}

            {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

            <div className="mt-5 flex items-start gap-3 rounded-card border border-line bg-canvas/80 p-4 text-sm text-muted">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <p>
                Защищённый вход. Права определяются ролями, выданными
                провайдером или бэкендом — не выбором в браузере.
              </p>
            </div>

            {demoMode ? (
              <p className="mt-4 text-xs text-muted">
                Сейчас включён NEXT_PUBLIC_DEMO_MODE.
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link href="/help" className="font-medium text-brand hover:underline">
                Не получается войти?
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
