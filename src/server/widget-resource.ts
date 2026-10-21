import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { RESOURCE_MIME_TYPE, registerAppResource } from "@modelcontextprotocol/ext-apps/server";
import type { McpServer } from "@modelcontextprotocol/server";

export const WEATHER_WIDGET_URI = "ui://get-weather/mcp-app.html";

// Resolved relative to this module, so the server works from any working directory.
const WIDGET_HTML_PATH = fileURLToPath(new URL("../mcp-app.html", import.meta.url));

export function registerWeatherWidget(server: McpServer): void {
  registerAppResource(
    server,
    "Weather card",
    WEATHER_WIDGET_URI,
    { mimeType: RESOURCE_MIME_TYPE, description: "Interactive weather card for get_weather" },
    async () => ({
      contents: [
        {
          uri: WEATHER_WIDGET_URI,
          mimeType: RESOURCE_MIME_TYPE,
          text: await readFile(WIDGET_HTML_PATH, "utf-8"),
        },
      ],
    }),
  );
}
