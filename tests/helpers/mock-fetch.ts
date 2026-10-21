import { vi } from "vitest";

export function mockFetchResponse(body: unknown, status = 200): void {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json(body, { status })));
}

export function mockFetchSequence(...bodies: unknown[]): void {
  const fetchMock = vi.fn();
  for (const body of bodies) {
    fetchMock.mockResolvedValueOnce(Response.json(body));
  }
  vi.stubGlobal("fetch", fetchMock);
}

export function mockFetchNetworkError(): void {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("fetch failed")));
}
