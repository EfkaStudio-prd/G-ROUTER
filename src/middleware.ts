import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/login",
  "/sign-up",
  "/api/v1(.*)",
  "/api/webhooks(.*)",
  "/docs(.*)",
  "/status(.*)",
]);

export default clerkMiddleware((auth, req) => {
  // Allow public routes without authentication
  if (isPublicRoute(req)) {
    return;
  }

  // Protect dashboard and other private routes
  auth().protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files by default
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
