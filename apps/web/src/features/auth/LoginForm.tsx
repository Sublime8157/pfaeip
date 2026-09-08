import { useState, type SyntheticEvent } from "react";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { login } from "./session";

export function LoginForm() {
  const router = useRouter();
  const doLogin = useServerFn(login);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const res = await doLogin({
      data: {
        email: String(form.get("email")),
        password: String(form.get("password")),
      },
    }).catch((err: Error) => ({ error: err.message }));

    setPending(false);
    if (res.error) return setError(res.error);

    await router.invalidate();
    router.navigate({ to: "/login" });
  }
  return (
    <form onSubmit={onSubmit}>
      {error && <p role="alert">{error}</p>}
      <h1>Log in</h1>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </label>
      <button type="submit" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
