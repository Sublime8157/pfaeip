import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { logout } from "../features/auth/session";
import { useState } from "react";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context }) => {
    if (!context.user) throw redirect({ to: "/login" });
  },
  component: DashboardPage,
});

function DashboardPage() {
  const router = useRouter();
  const { user } = Route.useRouteContext();
  const doLogout = useServerFn(logout);
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    try {
      setPending(true);
      await doLogout();
      router.invalidate();
      router.navigate({ to: "/login" });
    } catch (err) {
      console.error(err);
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <p>Hello {user?.username ?? "stranger"}, from the dashboard</p>
      <button type="button" onClick={handleLogout}>
        {pending ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
