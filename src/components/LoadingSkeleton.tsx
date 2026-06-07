/**
 * Lightweight loading skeleton used during route transitions / Suspense fallback.
 * Pure CSS — no JS state. Respects prefers-reduced-motion.
 */
const LoadingSkeleton = () => {
  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="space-y-4 motion-safe:animate-pulse">
          <div className="h-3 w-32 bg-secondary/60 rounded" />
          <div className="h-12 w-3/4 bg-secondary/60 rounded" />
          <div className="h-12 w-1/2 bg-secondary/60 rounded" />
          <div className="space-y-2 pt-4">
            <div className="h-4 w-full bg-secondary/40 rounded" />
            <div className="h-4 w-5/6 bg-secondary/40 rounded" />
            <div className="h-4 w-4/6 bg-secondary/40 rounded" />
          </div>
        </div>
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
