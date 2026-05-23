import type { FilterFunction } from "./constants.js";

// Safe wrapper: catch errors, never throw
export function safeApply(fn: FilterFunction, text: string): string | null {
  try {
    const result = fn(text);
    if (typeof result !== "string") return null;
    return result;
  } catch (e) {
    console.warn("[RTK] Filter error:", (e as Error).message);
    return null;
  }
}
