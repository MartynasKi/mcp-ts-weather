import { registerAppTool } from "@modelcontextprotocol/ext-apps/server";
import type { CallToolResult, McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";
import { weatherReportSchema } from "../shared/weather-report.js";
import { CityNotFoundError, WeatherServiceError } from "./errors.js";
import { formatSummary } from "./summary.js";
import { getWeatherReport } from "./weather-service.js";
import { WEATHER_WIDGET_URI } from "./widget-resource.js";

const UNEXPECTED_ERROR_MESSAGE = "Something went wrong while getting the weather. Please try again.";

const inputSchema = z.object({
  city: z.string().trim().min(1).describe('City name, for example "Šiauliai" or "Paris"'),
});

export function registerWeatherTool(server: McpServer): void {
  registerAppTool(
    server,
    "get_weather",
    {
      title: "Get weather",
      description: "Get the current weather and a 5-day forecast for a city.",
      inputSchema,
      outputSchema: weatherReportSchema,
      _meta: { ui: { resourceUri: WEATHER_WIDGET_URI } },
    },
    ({ city }) => handleGetWeather(city),
  );
}

export async function handleGetWeather(city: string): Promise<CallToolResult> {
  try {
    const report = await getWeatherReport(city);
    return {
      content: [{ type: "text", text: formatSummary(report) }],
      structuredContent: report,
    };
  } catch (error) {
    return {
      content: [{ type: "text", text: toUserMessage(error) }],
      isError: true,
    };
  }
}

function toUserMessage(error: unknown): string {
  if (error instanceof CityNotFoundError) {
    return error.message;
  }
  console.error("get_weather failed:", error);
  return error instanceof WeatherServiceError ? error.message : UNEXPECTED_ERROR_MESSAGE;
}
