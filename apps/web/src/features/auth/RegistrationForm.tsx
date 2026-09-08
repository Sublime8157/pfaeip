import { useState, type SyntheticEvent } from "react";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { register } from "./register";

export function RegistrationForm() {
  const router = useRouter();
  const doRegister = useServerFn(register);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const res = await doRegister({
      data: Object.fromEntries(form) as never,
    }).catch((err: Error) => ({ ok: false as const, error: err.message }));

    setPending(false);
    if (!res.ok) return setError(res.error);

    await router.invalidate();
    router.navigate({ to: "/login" });
  }

  return (
    <form onSubmit={onSubmit}>
      {error && <p role="alert">{error}</p>}
      <h1>Create an account</h1>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Username
        <input
          name="username"
          autoComplete="username"
          required
          minLength={3}
          maxLength={32}
          pattern="[A-Za-z0-9_]+"
        />
      </label>
      <label>
        Full name
        <input name="fullname" autoComplete="name" required maxLength={100} />
      </label>
      <label>
        Birthdate
        <input
          name="birthdate"
          type="date"
          autoComplete="bday"
          required
          max={new Date().toISOString().slice(0, 10)}
        />
      </label>
      <label>
        Rate
        <input name="rate" type="number" min={0} step={1} required />
      </label>
      <label>
        Pay frequency
        <select name="payFrequency" defaultValue="MONTHLY">
          <option value="WEEKLY">Weekly</option>
          <option value="SEMI_MONTHLY">Semi-monthly</option>
          <option value="MONTHLY">Monthly</option>
        </select>
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={72}
        />
      </label>
      <button type="submit" disabled={pending}>
        {pending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
