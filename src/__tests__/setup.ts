/**
 * Vitest setup — runs before every test file.
 * Provides DOM matchers + mocks the i18next instance.
 */
import "@testing-library/jest-dom/vitest";
import { vi, beforeEach } from "vitest";

// jsdom/happy-dom don't ship IntersectionObserver — many components use it.
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
  root: Element | null = null;
  rootMargin = "0px";
  thresholds: ReadonlyArray<number> = [0];
}
(globalThis as unknown as { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;

// matchMedia stub for theme + responsive hooks
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// scrollTo is not implemented in happy-dom but ScrollToTop calls it.
Object.defineProperty(window, "scrollTo", { writable: true, value: vi.fn() });

beforeEach(() => {
  vi.clearAllMocks();
});
