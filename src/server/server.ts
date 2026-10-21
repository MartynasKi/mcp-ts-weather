import { McpServer } from "@modelcontextprotocol/server";
import { registerWeatherTool } from "./weather-tool.js";
import { registerWeatherWidget } from "./widget-resource.js";

export function createServer(): McpServer {
  const server = new McpServer({ name: "ts-mcp-weather", version: "1.0.0" });
  registerWeatherWidget(server);
  registerWeatherTool(server);
  return server;
}
