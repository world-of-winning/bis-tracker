/**
 * Write a test fixture from a cached roster.
 *
 * The cache holds the upstream response as it arrived, ~1.1MB a spec. A
 * fixture holds only what the derivation reads, which is a few tens of
 * kilobytes — small enough to live in the repo and to read in a diff.
 *
 * Usage:
 *   node scripts/make-fixture.mjs prot-paladin
 */
import { existsSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { trimRoster } from "./priority-groups.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const key = process.argv[2];
if (!key) {
    console.error("Usage: node scripts/make-fixture.mjs <spec-key>");
    process.exit(1);
}

const src = resolve(__dirname, ".murlok-cache", `${key}.json`);
if (!existsSync(src)) {
    console.error(
        `No cached roster for ${key}. Fetch it first:\n` +
            `  node scripts/generate-priority-stats.mjs --spec ${key} --max-age 0`,
    );
    process.exit(1);
}

const characters = trimRoster(JSON.parse(readFileSync(src, "utf8")));
const dest = resolve(__dirname, "../tests/fixtures", `${key}.json`);
writeFileSync(dest, JSON.stringify(characters) + "\n", "utf8");
console.log(`${dest} — ${characters.length} characters`);
