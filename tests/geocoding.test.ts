import { afterEach, describe, expect, it, vi } from "vitest";
import { CityNotFoundError, WeatherServiceError } from "../src/server/errors.js";
import { findCity } from "../src/server/open-meteo/geocoding.js";
import { EMPTY_GEOCODING_RESPONSE, SIAULIAI_GEOCODING_RESPONSE_SAMPLE } from "./helpers/fixtures.js";
import { mockFetchNetworkError, mockFetchResponse } from "./helpers/mock-fetch.js";

describe("findCity", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns the best match with its coordinates", async () => {
    mockFetchResponse(SIAULIAI_GEOCODING_RESPONSE_SAMPLE);

    await expect(findCity("Šiauliai")).resolves.toEqual({
      name: "Šiauliai",
      country: "Lithuania",
      latitude: 55.93333,
      longitude: 23.31667,
    });
  });

  it("throws CityNotFoundError when there are no results", async () => {
    mockFetchResponse(EMPTY_GEOCODING_RESPONSE);

    await expect(findCity("Atlantis")).rejects.toBeInstanceOf(CityNotFoundError);
  });

  it("throws WeatherServiceError when the network fails", async () => {
    mockFetchNetworkError();

    await expect(findCity("Šiauliai")).rejects.toBeInstanceOf(WeatherServiceError);
  });

  it("throws WeatherServiceError on an HTTP error status", async () => {
    mockFetchResponse({ error: true }, 500);

    await expect(findCity("Šiauliai")).rejects.toThrow("HTTP 500");
  });
});
