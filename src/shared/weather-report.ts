import { z } from "zod";

export const WEATHER_THEMES = ["clear", "cloudy", "fog", "rain", "snow", "storm"] as const;

const weatherConditionSchema = z.object({
  label: z.string(),
  emoji: z.string(),
  theme: z.enum(WEATHER_THEMES),
});

const dailyForecastSchema = z.object({
  date: z.string().describe("Local date, YYYY-MM-DD"),
  condition: weatherConditionSchema,
  maxTemperature: z.number().describe("°C"),
  minTemperature: z.number().describe("°C"),
});

// Shared by the tool's outputSchema and the UI, so both sides agree on one shape.
export const weatherReportSchema = z.object({
  location: z.object({
    city: z.string(),
    country: z.string(),
  }),
  current: z.object({
    temperature: z.number().describe("°C"),
    feelsLike: z.number().describe("°C"),
    humidity: z.number().describe("%"),
    windSpeed: z.number().describe("km/h"),
    condition: weatherConditionSchema,
  }),
  daily: z.array(dailyForecastSchema),
});

export type WeatherTheme = (typeof WEATHER_THEMES)[number];
export type WeatherCondition = z.infer<typeof weatherConditionSchema>;
export type DailyForecast = z.infer<typeof dailyForecastSchema>;
export type WeatherReport = z.infer<typeof weatherReportSchema>;
