import type { DailyForecast, WeatherReport } from "../shared/weather-report.js";
import {
  formatDayName,
  formatPercent,
  formatTemperature,
  formatWindSpeed,
} from "./format.js";

export function renderCard({ location, current, daily }: WeatherReport): void {
  setText("city", location.city);
  setText("country", location.country);
  setText("icon", current.condition.emoji);
  setText("temperature", formatTemperature(current.temperature));
  setText("condition", current.condition.label);
  setText("feels-like", formatTemperature(current.feelsLike));
  setText("humidity", formatPercent(current.humidity));
  setText("wind", formatWindSpeed(current.windSpeed));
  getElement("forecast").replaceChildren(...daily.map(createForecastDay));

  const card = getElement("card");
  card.dataset.weather = current.condition.theme;
  card.hidden = false;
  getElement("status").hidden = true;
}

export function renderMessage(message: string): void {
  setText("status", message);
  getElement("status").hidden = false;
  getElement("card").hidden = true;
}

function createForecastDay(day: DailyForecast, dayIndex: number): HTMLLIElement {
  const item = document.createElement("li");
  item.className = "forecast__day";
  item.title = day.condition.label;
  item.append(
    createSpan("forecast__name", formatDayName(day.date, dayIndex)),
    createSpan("forecast__icon", day.condition.emoji),
    createSpan("forecast__high", formatTemperature(day.maxTemperature)),
    createSpan("forecast__low", formatTemperature(day.minTemperature)),
  );
  return item;
}

function createSpan(className: string, text: string): HTMLSpanElement {
  const span = document.createElement("span");
  span.className = className;
  span.textContent = text;
  return span;
}

function setText(id: string, text: string): void {
  getElement(id).textContent = text;
}

function getElement(id: string): HTMLElement {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Missing #${id} in mcp-app.html`);
  }
  return element;
}
