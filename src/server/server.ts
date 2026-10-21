import { McpServer } from "@modelcontextprotocol/server";
import { SERVER_ICON } from "./server-icon.js";
import { registerWeatherTool } from "./weather-tool.js";
import { registerWeatherWidget } from "./widget-resource.js";

export function createServer(): McpServer {
  const server = new McpServer({
    name: "ts-mcp-weather",
    title: "Weather",
    version: "1.0.0",
    description: "Current weather and a 5-day forecast, shown as a weather card",
    websiteUrl: "https://github.com/MartynasKi/mcp-ts-weather",
    icons: [SERVER_ICON],
  });
  registerWeatherWidget(server);
  registerWeatherTool(server);
  return server;
}
