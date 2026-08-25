/**
 * Write a test fixture from a cached guide page.
 *
 * The cache holds the page as it arrived, ~300KB a spec, nearly all of it
 * talent trees and markup the parser never looks at. A fixture holds the two
 * stat charts and nothing else — small enough to live in the repo and to read
 * in a diff.
 *
 * Both charts are kept, tertiary included. The parser's job is partly to pick
 * the right one, and a fixture that had already done the picking would not
 * test that.
 *
 * Usage:
 *   node scripts/make-fixture.mjs prot-paladin
 */
import { existsSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { parseStatChart } from "./priority-groups.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const key = process.argv[2];
if (!key) {
    console.error("Usage: node scripts/make-fixture.mjs <spec-key>");
    process.exit(1);
}

const src = resolve(__dirname, ".murlok-cache", `${key}.html`);
if (!existsSync(src)) {
    console.error(
        `No cached page for ${key}. Fetch it first:\n` +
            `  node scripts/generate-priority-stats.mjs --spec ${key} --max-age 0`,
    );
    process.exit(1);
}

const html = readFileSync(src, "utf8");
const charts = html.match(/<ul class="guide-stats-size-\d+">[\s\S]*?<\/ul>/g);
if (!charts || !charts.length) {
    console.error(`No stat chart in the cached page for ${key}.`);
    process.exit(1);
}

const fixture = charts.join("\n");
if (!parseStatChart(fixture)) {
    console.error(`The extracted chart does not parse — the page shape changed.`);
    process.exit(1);
}

const dest = resolve(__dirname, "../tests/fixtures", `${key}.html`);
writeFileSync(dest, fixture + "\n", "utf8");
console.log(`${dest}  (${charts.length} chart(s), ${(fixture.length / 1024).toFixed(1)} KB)`);
