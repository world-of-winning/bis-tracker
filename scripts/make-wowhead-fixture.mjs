/**
 * Write a test fixture from a cached Wowhead BiS guide page.
 *
 * The cached page is 140-200KB a spec, nearly all of it chrome the parser
 * never looks at. A fixture keeps only what the parser has to work through:
 *
 *   - Both printHtml call sites. The guide body is the one passed a string
 *     literal; the other is handed WH.getPageData and holds something else.
 *     Choosing between them is part of the parser's job.
 *   - Inside the body, the [tabs name=bis_items] block in full, plus a stub
 *     of the next tabs block, so picking the right block is tested too.
 *
 * Usage:
 *   node scripts/make-wowhead-fixture.mjs veng-dh
 */
import { existsSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { guideMarkup, bisItemsBlock } from "./wowhead-guide.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const key = process.argv[2];
if (!key) {
    console.error("Usage: node scripts/make-wowhead-fixture.mjs <spec-key>");
    process.exit(1);
}

const src = resolve(__dirname, ".wowhead-guide-cache", `${key}.html`);
if (!existsSync(src)) {
    console.error(`No cached guide page for ${key}. Fetch it first.`);
    process.exit(1);
}

const html = readFileSync(src, "utf8");
const body = guideMarkup(html);
if (!body) {
    console.error(`No guide body in the cached page for ${key}.`);
    process.exit(1);
}
const block = bisItemsBlock(body);
if (!block) {
    console.error(`No bis_items block in the guide body for ${key}.`);
    process.exit(1);
}

// A second tabs block, cut to its opening tag, so the parser has something to
// pick bis_items out from rather than finding it alone.
const other = body.match(/\[tabs[^\]]*name=(?!bis_items)\w+\]/);
const trimmedBody =
    "[db=live]\r\n" + block + (other ? `\n\n${other[0]}\n[/tabs]` : "");

const fixture = `<!-- Fixture: trimmed from the Wowhead BiS guide for ${key}.
     Regenerate with: node scripts/make-wowhead-fixture.mjs ${key} -->
<script>
    WH.markup.printHtml(
        WH.getPageData("wowhead-guide-fixture-stub"),
        "guide-body-stub"
    );
</script>
<script>
    WH.markup.printHtml(${JSON.stringify(trimmedBody)});
</script>
`;

const out = resolve(__dirname, "..", "tests", "fixtures", `wowhead-${key}.html`);
writeFileSync(out, fixture, "utf8");
console.log(`${out} (${fixture.length} bytes)`);
