import { z } from "zod";
import type { WeatherReport } from "../../shared/weather-report.js";
import { describeWeatherCode } from "../weather-codes.js";
import { fetchJson } from "./http-client.js";

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const FORECAST_DAYS = 5;
const CURRENT_FIELDS = [
  "temperature_2m",
  "apparent_temperature",
  "relative_humidity_2m",
  "wind_speed_10m",
  "weather_code",
];
const DAILY_FIELDS = ["weather_code", "temperature_2m_max", "temperature_2m_min"];

const forecastResponseSchema = z.object({
  current: z.object({
    temperature_2m: z.number(),
    apparent_temperature: z.number(),
    relative_humidity_2m: z.number(),
    wind_speed_10m: z.number(),
    weather_code: z.number(),
  }),
  daily: z.object({
    time: z.array(z.string()),
    weather_code: z.array(z.number()),
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
  }),
});

type ForecastResponse = z.infer<typeof forecastResponseSchema>;

export type Forecast = Pick<WeatherReport, "current" | "daily">;

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export async function fetchForecast({ latitude, longitude }: Coordinates): Promise<Forecast> {
  const url = new URL(FORECAST_URL);
  url.search = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: CURRENT_FIELDS.join(","),
    daily: DAILY_FIELDS.join(","),
    forecast_days: String(FORECAST_DAYS),
    // Daily dates must be in the city's local time zone, not UTC.
    timezone: "auto",
  }).toString();

  return toForecast(await fetchJson(url, forecastResponseSchema));
}

function toForecast({ current, daily }: ForecastResponse): Forecast {
  return {
    current: {
      temperature: current.temperature_2m,
      feelsLike: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      condition: describeWeatherCode(current.weather_code),
    },
    // Open-Meteo returns daily values as parallel arrays indexed by day.
    daily: daily.time.map((date, day) => ({
      date,
      condition: describeWeatherCode(daily.weather_code[day]),
      maxTemperature: daily.temperature_2m_max[day],
      minTemperature: daily.temperature_2m_min[day],
    })),
  };
}
