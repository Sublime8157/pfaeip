import assert from "node:assert";
import { hashPassword, verifyPassword } from "./password";

const stored = await hashPassword("my-secret-password");

assert.match(stored, /^[a-f0-9]{32}:[a-f0-9]{128}$/);
assert.ok(await verifyPassword("my-secret-password", stored));
assert.ok(!(await verifyPassword("wrong-password", stored)));
assert.ok(!(await verifyPassword("my-secret-password", "invalid-format")));
assert.notEqual(stored, await hashPassword("my-secret-password"));

console.log("ok");
