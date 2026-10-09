"use client";

import { useActionState } from "react";
import { login, type LoginState } from "../actions";
import { Button } from "@/components/ui/button";

const initial: LoginState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(login, initial);

  return (
    <form action={action} className="flex flex-col gap-5" noValidate>
      {state.error && (
        <p
          role="alert"
          className="rounded-xl border border-line bg-soft px-4 py-3 text-sm text-ink"
        >
          {state.error}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="font-display text-sm font-semibold text-ink"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={!!state.fieldErrors?.email}
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          className="min-h-11 rounded-xl border border-line bg-surface px-4 text-ink placeholder:text-muted"
          placeholder="you@example.com"
        />
        {state.fieldErrors?.email && (
          <p id="email-error" className="text-sm text-brand">
            {state.fieldErrors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="font-display text-sm font-semibold text-ink"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={!!state.fieldErrors?.password}
          aria-describedby={
            state.fieldErrors?.password ? "password-error" : undefined
          }
          className="min-h-11 rounded-xl border border-line bg-surface px-4 text-ink placeholder:text-muted"
          placeholder="Your password"
        />
        {state.fieldErrors?.password && (
          <p id="password-error" className="text-sm text-brand">
            {state.fieldErrors.password}
          </p>
        )}
      </div>

      <Button type="submit" variant="accent" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
