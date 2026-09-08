import assert from "node:assert";
import { registrationInput, uniqueConflict } from "./register";

const valid = {
  email: "  Joven@Example.COM ",
  password: "hunter2hunter2",
  username: "joven_1",
  fullname: " Joven ",
  birthdate: "1995-04-02",
  rate: "500",
};

const parsed = registrationInput.parse(valid);
assert.equal(parsed.email, "joven@example.com");
assert.equal(parsed.fullname, "Joven");
assert.equal(parsed.rate, 500);
assert.ok(parsed.birthdate instanceof Date);
assert.equal(parsed.payFrequency, undefined);

const bad = (patch: Record<string, unknown>) =>
  assert.ok(!registrationInput.safeParse({ ...valid, ...patch }).success);

bad({ email: "not-an-email" });
bad({ password: "short" });
bad({ username: "no" });
bad({ username: "has space" });
bad({ fullname: "  " });
bad({ birthdate: "2999-01-01" });
bad({ rate: -1 });
bad({ rate: 1.5 });
bad({ payFrequency: "DAILY" });

assert.equal(uniqueConflict({ code: "P2002", meta: { target: ["email"] } }), "email");
assert.equal(uniqueConflict({ code: "P2002", meta: { target: ["username"] } }), "username");
assert.equal(uniqueConflict({ code: "P2002", meta: { target: ["rate"] } }), null);
assert.equal(uniqueConflict({ code: "P2025" }), null);
assert.equal(uniqueConflict(new Error("boom")), null);
assert.equal(uniqueConflict(null), null);

console.log("ok");
