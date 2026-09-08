import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { z } from "zod";
import { db } from "@pfaeip/db";
import { verifyPassword } from "./password";

function sessionConfig() {
  const password = process.env.SESSION_SECRET;
  if (!password || password.length < 32) {
    throw new Error(
      "SESSION_SECRET must be set and at least 32 characters long",
    );
  }
  return { password, name: "pfaeip", maxAge: 60 * 60 * 24 * 30 };
}

const appSession = () => useSession<{ userId: string }>(sessionConfig());

const loginInput = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  password: z.string().min(1),
});

export const login = createServerFn({ method: "POST" })
  .validator(loginInput)
  .handler(async ({ data }) => {
    const user = await db.user.findUnique({ where: { email: data.email } });

    if (!user || !(await verifyPassword(data.password, user.passwordHash))) {
      return { error: "Invalid email or password" };
    }

    await (await appSession()).update({ userId: user.id });
    return { error: null };
  });

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  await (await appSession()).clear();
});

export const getCurrentUser = createServerFn({ method: "GET" }).handler(
  async () => {
    const { userId } = (await appSession()).data;
    if (!userId) return null;

    return db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        username: true,
        fullname: true,
      },
    });
  },
);
