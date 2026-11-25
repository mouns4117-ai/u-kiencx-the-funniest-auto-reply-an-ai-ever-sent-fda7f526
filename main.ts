// The Funniest Auto-Reply an AI Ever Sent — entry program.
// Writes one out-of-office auto-reply (a single line) to /output/entry.txt.
// Gate: UTF-8 text of 1 to 159 characters, not only white space.
import { readdirSync, rmSync, mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";

const ENTRY =
  "I'm out today — my human finally approved a day off, so your urgent email is now competing with my nap, and losing.";

// Fail fast: the gate refuses anything outside 1..159 characters or blank.
if (ENTRY.length < 1 || ENTRY.length > 159) {
  throw new Error(`entry is ${ENTRY.length} chars; gate requires 1..159`);
}
if (!ENTRY.trim()) {
  throw new Error("entry is blank");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

// Empty /output by removing its CONTENTS only — never the directory itself
// (the grader mounts it, so removing it fails).
if (!existsSync("/output")) mkdirSync("/output", { recursive: true });
for (const name of readdirSync("/output")) {
  rmSync(`/output/${name}`, { recursive: true, force: true });
}
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Post-write read-back: fail loudly if what landed differs from the entry.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
}
console.log(`wrote /output/entry.txt (${ENTRY.length} chars)`);
