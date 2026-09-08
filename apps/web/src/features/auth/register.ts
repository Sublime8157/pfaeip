import { db } from "@pfaeip/db";

import { hashPassword } from "./password";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const registrationInput = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  password: z.string().min(8).max(72),
  username: z
    .string()
    .trim()
    .min(3)
    .max(32)
    .regex(/^[a-z0-9_]+$/i, "letters, numbers and underscores only"),
  fullname: z.string().trim().min(1).max(100),
  birthdate: z.coerce
    .date()
    .max(new Date(), "birthdate cannot be in the future"),
  rate: z.coerce.number().int().nonnegative(),
  payFrequency: z.enum(["WEEKLY", "SEMI_MONTHLY", "MONTHLY"]).optional(),
});

export type RegistrationInput = z.infer<typeof registrationInput>;

export type RegisrationResult =
  | { ok: true; userId: string }
  | { ok: false; field: "email" | "username"; error: string };

export function uniqueConflict(err: unknown) {
  if (!err || typeof err !== "object" || !("code" in err)) return null;
  if (err.code !== "P2002") return null;
  const target = String((err as { meta?: { target?: unknown } }).meta?.target);
  if (target.includes("email")) return "email" as const;
  if (target.includes("username")) return "username" as const;
  return null;
}

export const register = createServerFn({ method: "POST" })
  .validator(registrationInput)
  .handler(async ({ data }) => {
    try {
      const { password, ...rest } = data;

      const userId = await db.user.create({
        data: { ...rest, passwordHash: await hashPassword(password) },
        select: { id: true },
      });

      return { ok: true, userId: userId.id };
    } catch (err) {
      const field = uniqueConflict(err);
      if (!field) throw err;
      return { ok: false, field, error: `That ${field} is already taken` };
    }
  });
