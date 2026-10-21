import { describe, expect, it } from "vitest";
import { describeWeatherCode } from "../src/server/weather-codes.js";

describe("describeWeatherCode", () => {
  it.each([
    [0, "Clear sky", "clear"],
    [3, "Overcast", "cloudy"],
    [45, "Fog", "fog"],
    [63, "Rain", "rain"],
    [75, "Heavy snow", "snow"],
    [95, "Thunderstorm", "storm"],
  ])("maps code %i to %s", (code, label, theme) => {
    expect(describeWeatherCode(code)).toMatchObject({ label, theme });
  });

  it("falls back to an unknown condition for unmapped codes", () => {
    expect(describeWeatherCode(42).label).toBe("Unknown");
  });
});
