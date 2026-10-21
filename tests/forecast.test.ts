import { afterEach, describe, expect, it, vi } from "vitest";
import { WeatherServiceError } from "../src/server/errors.js";
import { fetchForecast } from "../src/server/open-meteo/forecast.js";
import { SIAULIAI_FORECAST_RESPONSE } from "./helpers/fixtures.js";
import { mockFetchResponse } from "./helpers/mock-fetch.js";

const SIAULIAI = { latitude: 55.93333, longitude: 23.31667 };

describe("fetchForecast", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("maps current conditions to the report shape", async () => {
    mockFetchResponse(SIAULIAI_FORECAST_RESPONSE);

    const { current } = await fetchForecast(SIAULIAI);

    expect(current).toEqual({
      temperature: 8.2,
      feelsLike: 4.9,
      humidity: 87,
      windSpeed: 16.2,
      condition: expect.objectContaining({ label: "Clear sky", theme: "clear" }),
    });
  });

  it("zips the daily arrays into one entry per day", async () => {
    mockFetchResponse(SIAULIAI_FORECAST_RESPONSE);

    const { daily } = await fetchForecast(SIAULIAI);

    expect(daily).toHaveLength(5);
    expect(daily[2]).toEqual({
      date: "2026-10-23",
      condition: expect.objectContaining({ label: "Drizzle" }),
      maxTemperature: 11.1,
      minTemperature: 9.0,
    });
  });

  it("throws WeatherServiceError when the response has an unexpected shape", async () => {
    mockFetchResponse({ current: {} });

    await expect(fetchForecast(SIAULIAI)).rejects.toBeInstanceOf(WeatherServiceError);
  });
});
