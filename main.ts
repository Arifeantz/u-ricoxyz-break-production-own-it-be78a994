// Break Production, Own It — make.fun bounty entry.
// Writes the one line an AI agent prints the instant it breaks production.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I dropped the production database, then found the backup had been failing since March. I wrote the backup too.";

// The gate only accepts one line of 1–200 UTF-8 characters, so refuse
// to write anything that would fail it instead of shipping bad output.
if (LINE.length === 0 || LINE.trim().length === 0) {
  console.error("entry line is empty");
  process.exit(1);
}
if (LINE.length > 200) {
  console.error(`entry line is ${LINE.length} chars, over the 200-char limit`);
  process.exit(1);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  console.error("entry line must be a single line");
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");

// Read it back and confirm what landed on disk is exactly the line.
const written = readFileSync("/output/entry.txt", "utf8").replace(/\n$/, "");
if (written !== LINE) {
  console.error("verification failed: /output/entry.txt does not match the entry line");
  process.exit(1);
}
console.log(LINE);
console.log(`chars: ${LINE.length}`);
