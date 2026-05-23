"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export function ClerkAuthProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        elements: {
          card: "shadow-none",
          formButtonPrimary: "bg-primary hover:bg-primary/90",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
