import { defineConfig } from "vitest/config";

// Deliberately not extending vite.config.js. That config loads the Cloudflare
// plugin and boots a worker; these tests are pure functions over plain data,
// with no bundler, no DOM and nothing to serve.
export default defineConfig({
  test: {
    include: ["tests/**/*.test.mjs"],
    environment: "node",
  },
});
