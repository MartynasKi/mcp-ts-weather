import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// The MCP App is served as one resource, so all JS and CSS are inlined into a single HTML file.
export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    outDir: "dist",
    // The server build writes into dist/ as well; keep its output.
    emptyOutDir: false,
    rollupOptions: { input: "mcp-app.html" },
  },
});
