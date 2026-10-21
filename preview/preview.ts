import { applyDocumentTheme, type McpUiTheme } from "@modelcontextprotocol/ext-apps";
import widgetHtml from "../mcp-app.html?raw";
import { WEATHER_THEMES, type WeatherTheme } from "../src/shared/weather-report.js";
import { renderCard } from "../src/ui/render-card.js";
import "../src/ui/styles.css";
import { createSampleReport } from "./sample-report.js";

// Renders the real widget markup with sample data, without an MCP host.
// Usage: /preview/?weather=storm&scheme=dark
const DEFAULT_WEATHER_THEME: WeatherTheme = "clear";
const COLOR_SCHEMES: readonly McpUiTheme[] = ["light", "dark"];

const params = new URLSearchParams(location.search);

mountWidgetMarkup();
applyColorScheme(params.get("scheme"));
renderCard(createSampleReport(parseWeatherTheme(params.get("weather"))));

// Reusing mcp-app.html keeps the preview in sync with the markup the host actually renders.
function mountWidgetMarkup(): void {
  const widget = new DOMParser().parseFromString(widgetHtml, "text/html");
  const main = widget.querySelector("main");
  if (!main) {
    throw new Error("mcp-app.html has no <main> element");
  }
  document.body.prepend(main);
}

// Without a scheme the card follows the OS setting, just like it does without a host theme.
function applyColorScheme(scheme: string | null): void {
  const theme = COLOR_SCHEMES.find((candidate) => candidate === scheme);
  if (theme) {
    applyDocumentTheme(theme);
  }
}

function parseWeatherTheme(value: string | null): WeatherTheme {
  return WEATHER_THEMES.find((theme) => theme === value) ?? DEFAULT_WEATHER_THEME;
}
