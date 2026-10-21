import { afterEach, describe, expect, it, vi } from "vitest";
import { handleGetWeather } from "../src/server/weather-tool.js";
import {
  EMPTY_GEOCODING_RESPONSE,
  SIAULIAI_FORECAST_RESPONSE_SAMPLE,
  SIAULIAI_GEOCODING_RESPONSE_SAMPLE,
} from "./helpers/fixtures.js";
import { mockFetchNetworkError, mockFetchSequence } from "./helpers/mock-fetch.js";

describe("handleGetWeather", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns a text summary and the structured report", async () => {
    mockFetchSequence(SIAULIAI_GEOCODING_RESPONSE_SAMPLE, SIAULIAI_FORECAST_RESPONSE_SAMPLE);

    const result = await handleGetWeather("Šiauliai");

    expect(result.isError).toBeUndefined();
    expect(result.content).toEqual([
      {
        type: "text",
        text: expect.stringContaining("Šiauliai, Lithuania: Clear sky, 8°C (feels like 5°C)"),
      },
    ]);
    expect(result.structuredContent).toMatchObject({
      location: { city: "Šiauliai", country: "Lithuania" },
      current: { temperature: 8.2 },
    });
  });

  it("returns a clear error when the city is not found", async () => {
    mockFetchSequence(EMPTY_GEOCODING_RESPONSE);

    const result = await handleGetWeather("Atlantis");

    expect(result.isError).toBe(true);
    expect(result.content).toEqual([
      { type: "text", text: expect.stringContaining('Could not find a city named "Atlantis"') },
    ]);
  });

  it("returns a clear error when the network fails", async () => {
    mockFetchNetworkError();
    vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await handleGetWeather("Šiauliai");

    expect(result.isError).toBe(true);
    expect(result.content).toEqual([
      { type: "text", text: expect.stringContaining("Could not reach the weather service") },
    ]);
  });
});
