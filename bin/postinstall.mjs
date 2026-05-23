#!/usr/bin/env node

/**
 * Golden Router - Postinstall Script for npm Global Install
 *
 * This script runs after `npm install -g golden-router` to:
 * 1. Generate STORAGE_ENCRYPTION_KEY if not set
 * 2. Display installation summary
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { randomBytes } from "node:crypto";

const home = homedir();
const dataDir = join(home, ".golden-router");
const envPath = join(dataDir, ".env");

console.log("\n🎉 Golden Router installed successfully!\n");

// Generate STORAGE_ENCRYPTION_KEY if not set
if (!process.env.STORAGE_ENCRYPTION_KEY) {
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  let content = "";
  if (existsSync(envPath)) {
    content = readFileSync(envPath, "utf-8");
  }

  if (!content.includes("STORAGE_ENCRYPTION_KEY=")) {
    const key = randomBytes(32).toString("hex");
    const separator = content.trim() ? "\n" : "";
    const newContent = content.trimEnd() + separator + `STORAGE_ENCRYPTION_KEY=${key}`;
    writeFileSync(envPath, newContent + "\n", "utf-8");
    console.log("✅ Generated STORAGE_ENCRYPTION_KEY in ~/.golden-router/.env\n");
  }
}

console.log("📝 Quick Start:");
console.log("   1. Configure your AI provider API keys in the dashboard");
console.log("   2. Run: golden-router");
console.log("   3. Open: http://localhost:20128\n");
console.log("📚 Documentation: https://github.com/EfkaStudio-prd/G-ROUTER\n");
