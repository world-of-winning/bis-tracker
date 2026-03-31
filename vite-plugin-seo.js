import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Vite plugin that replaces %VITE_SITE_URL% placeholders at build time.
 * - index.html: via transformIndexHtml hook
 * - Static assets (robots.txt, sitemap.xml): via closeBundle hook (post-write)
 */
export default function seoPlugin() {
  var siteUrl = "";
  var outDir = "";

  return {
    name: "seo-placeholder",
    configResolved: function(config) {
      siteUrl = (config.env.VITE_SITE_URL || "").replace(/\/+$/, "");
      outDir = config.build.outDir;
    },
    transformIndexHtml: function(html) {
      var result = html.replace(/%VITE_SITE_URL%/g, siteUrl);
      if (!siteUrl) {
        // Remove tags that become invalid without an absolute URL
        result = result.replace(/<link rel="canonical"[^>]*>\s*/g, "");
        result = result.replace(/<meta[^>]*(?:og:url|og:image|twitter:image)[^>]*>\s*/g, "");
      }
      return result;
    },
    closeBundle: function() {
      var targets = ["robots.txt", "sitemap.xml"];
      for (var i = 0; i < targets.length; i++) {
        var filePath = join(outDir, targets[i]);
        try {
          var content = readFileSync(filePath, "utf-8");
          if (content.indexOf("%VITE_SITE_URL%") !== -1) {
            var replaced = content.replace(/%VITE_SITE_URL%/g, siteUrl);
            if (!siteUrl) {
              // Remove lines that become invalid without a site URL (e.g. "Sitemap: /sitemap.xml")
              replaced = replaced.replace(/^Sitemap:\s*\/.*$/gm, "").replace(/\n{3,}/g, "\n\n");
            }
            writeFileSync(filePath, replaced);
          }
        } catch (e) {
          // File doesn't exist in output, skip
        }
      }
    }
  };
}
