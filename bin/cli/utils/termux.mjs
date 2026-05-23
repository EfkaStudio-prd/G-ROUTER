#!/usr/bin/env node

import { existsSync } from "node:fs";

/**
 * Returns true when running inside a Termux environment on Android.
 *
 * Node.js on Termux reports process.platform === "linux" (not "android"),
 * so OS-level platform checks are insufficient. Use Termux-specific signals:
 *   1. TERMUX_VERSION env var (set by Termux bootstrap, most reliable)
 *   2. PREFIX env var containing "com.termux"
 *   3. Filesystem probe at /data/data/com.termux (last resort, no env needed)
 *
 * @param {object} [env]  Override process.env for testing.
 * @returns {boolean}
 */
export function isTermux(env = process.env) {
  if (env.TERMUX_VERSION) return true;
  if (typeof env.PREFIX === "string" && env.PREFIX.includes("com.termux")) return true;
  try {
    return existsSync("/data/data/com.termux");
  } catch {
    return false;
  }
}
