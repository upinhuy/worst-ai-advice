// Worst AI Advice — one line of the worst possible advice an AI could give.
// Writes the entry to /output/entry.txt (or $ENTRY_OUTPUT when set, for local runs).
// Pure Node.js standard library, no dependencies, no network, no secrets.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "For a quieter night, take the battery out of your smoke alarm — it mostly beeps when nothing is burning anyway.";

const MAX_CHARS = 140;

function validate(text: string): void {
  // Count Unicode code points, not UTF-16 code units, so the gate's
  // 1–140 character limit is measured the way a reader sees it.
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry must be 1–${MAX_CHARS} characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

const outPath = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
validate(ENTRY);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`Wrote ${[...ENTRY].length} characters to ${outPath}`);
