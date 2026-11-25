// Entry for "The Meeting That Should Have Been an Email" (make.fun).
// Writes one funny line of plain text to the output file the kit's
// RULES require: /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// The grading sandbox mounts the repository read-only, so the output
// directory must come from the environment, never from the repo itself.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "The meeting could have been an email, but then nobody would have watched Dave eat a sandwich on mute for an hour.";

// The gate refuses anything over 200 characters: fail loudly here
// instead of shipping an invalid entry.
if (line.length > 200) {
  throw new Error(`entry is ${line.length} characters, over the 200 limit`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, line, "utf8");
console.log(`wrote ${line.length} characters to ${outFile}`);
