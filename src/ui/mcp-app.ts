import { App } from "@modelcontextprotocol/ext-apps";
import type { CallToolResult } from "@modelcontextprotocol/client";
import { weatherReportSchema } from "../shared/weather-report.js";
import { applyHostContext } from "./host-theme.js";
import { renderCard, renderMessage } from "./render-card.js";
import "./styles.css";

const FALLBACK_ERROR_MESSAGE = "Weather data is unavailable.";

const app = new App({ name: "Weather Card", version: "1.0.0" });

// Handlers are attached before connecting so the initial tool result is not missed.
app.ontoolresult = showToolResult;
app.onhostcontextchanged = applyHostContext;
app.onerror = console.error;

await app.connect();
const hostContext = app.getHostContext();
if (hostContext) {
  applyHostContext(hostContext);
}

function showToolResult(result: CallToolResult): void {
  const report = weatherReportSchema.safeParse(result.structuredContent);
  if (result.isError || !report.success) {
    renderMessage(firstText(result) ?? FALLBACK_ERROR_MESSAGE);
    return;
  }
  renderCard(report.data);
}

function firstText({ content }: CallToolResult): string | undefined {
  return content.find((block) => block.type === "text")?.text;
}
