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
      return html.replace(/%VITE_SITE_URL%/g, siteUrl);
    },
    closeBundle: function() {
      var targets = ["robots.txt", "sitemap.xml"];
      for (var i = 0; i < targets.length; i++) {
        var filePath = join(outDir, targets[i]);
        try {
          var content = readFileSync(filePath, "utf-8");
          if (content.indexOf("%VITE_SITE_URL%") !== -1) {
            writeFileSync(filePath, content.replace(/%VITE_SITE_URL%/g, siteUrl));
          }
        } catch (e) {
          // File doesn't exist in output, skip
        }
      }
    }
  };
}
