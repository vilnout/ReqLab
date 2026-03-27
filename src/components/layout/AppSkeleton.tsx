const SkeletonBlock = ({ className = "" }: { className?: string }) => {
  return <div className={`skeleton-shimmer rounded ${className}`} />;
};

export const AppSkeleton = () => {
  return (
    <div className="bg-surface-base flex h-screen flex-col overflow-hidden">
      <div className="bg-surface-overlay border-border-default flex h-11 shrink-0 items-center gap-1 border-b px-1 md:gap-3 md:px-4">
        <div className="border-border-default flex h-full shrink-0 items-center gap-1 border-r px-2 md:w-51 md:px-4">
          <div className="skeleton-shimmer h-2 w-2 shrink-0 rounded-full" />
          <SkeletonBlock className="h-3 w-20" />
        </div>
        {/* tabs */}
        <div className="flex h-full flex-1 items-center gap-1">
          <SkeletonBlock className="h-6 w-28" />
          <SkeletonBlock className="hidden h-6 w-28 opacity-50 md:block" />
        </div>
        {/* action buttons */}
        <div className="flex items-center gap-2">
          <SkeletonBlock className="h-7 w-7" />
          <SkeletonBlock className="h-7 w-7" />
        </div>
      </div>
      {/* workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* sidebar */}
        <div className="hidden w-55 md:flex">
          <div className="bg-surface-overlay border-border-default flex w-full shrink-0 flex-col overflow-hidden border-r">
            {/* collections */}
            <div className="flex flex-1 shrink-0 flex-col">
              <div className="flex items-center justify-between px-3.5 py-3">
                <SkeletonBlock className="h-2.5 w-20" />
                <SkeletonBlock className="h-4 w-4" />
              </div>
              {/* collection items */}
              <div className="flex-1 overflow-y-auto px-2 pb-2">
                <div className="flex items-center gap-2 rounded px-1 py-1">
                  <SkeletonBlock className="h-3 w-3" />
                  <SkeletonBlock className="h-3 w-24" />
                </div>
                <div className="flex items-center gap-2 rounded px-1 py-1">
                  <SkeletonBlock className="h-3 w-3" />
                  <SkeletonBlock className="h-3 w-24" />
                </div>
                <div className="flex items-center gap-2 rounded px-1 py-1">
                  <SkeletonBlock className="h-3 w-3" />
                  <SkeletonBlock className="h-3 w-24" />
                </div>
              </div>
            </div>
            {/* recent history */}
            <div className="border-border-default mb-5 flex max-h-60 shrink-0 flex-col gap-2 border-t px-2 py-1">
              <div className="flex items-center gap-1.5">
                <SkeletonBlock className="h-3 w-3" />
                <SkeletonBlock className="h-2.5 w-15" />
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <SkeletonBlock className="h-2.5 w-8" />
                  <SkeletonBlock className="h-2.5 w-24 opacity-60" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* main panel */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-border-default grid min-w-0 items-center gap-2 border-b px-4 py-3 md:flex">
            <div className="flex flex-1 gap-1">
              <SkeletonBlock className="h-9 w-20" />
              <SkeletonBlock className="h-9 min-w-0 flex-1" />
            </div>
            <SkeletonBlock className="h-9 w-full min-w-0 md:w-20" />
          </div>
          {/* Request tabs skeleton */}
          <div className="border-border-default flex min-w-0 shrink-0 items-center gap-1 border-b px-4">
            {["w-14", "w-16", "w-12", "w-10"].map((w, i) => (
              <div key={i} className="min-w-0 px-3 py-2.5">
                <SkeletonBlock className={`${w} h-2.5`} />
              </div>
            ))}
          </div>
          {/* Params table skeleton */}
          <div className="shrink-0 p-4">
            <div className="border-border-default overflow-hidden rounded border">
              {/* Header */}
              <div className="bg-surface-overlay border-border-default grid grid-cols-[28px_1fr_1fr_28px] gap-4 border-b px-3 py-2">
                <div />
                <SkeletonBlock className="h-2 w-8" />
                <SkeletonBlock className="h-2 w-10" />
                <div />
              </div>
              {/* Rows */}
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="border-border-default grid grid-cols-2 items-center gap-4 border-b px-3 py-2 last:border-b-0 md:grid-cols-[28px_1fr_1fr_28px]"
                >
                  <SkeletonBlock className="hidden h-3 w-3 rounded-sm md:block" />
                  <SkeletonBlock className="h-3" />
                  <SkeletonBlock className="h-3" />
                  <div />
                </div>
              ))}
            </div>
          </div>
          {/* Divider */}
          <div className="bg-border-default h-1.5 shrink-0" />

          {/* Response panel skeleton */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Response header */}
            <div className="border-border-default flex shrink-0 items-center gap-2.5 border-b px-4 py-2.5">
              <SkeletonBlock className="h-2.5 w-16" />
              <SkeletonBlock className="h-5 w-20 rounded-full" />
              <SkeletonBlock className="h-5 w-14 rounded-full" />
              <SkeletonBlock className="h-5 w-12 rounded-full" />
            </div>

            {/* Empty response body */}
            <div className="flex flex-1 flex-col items-center justify-center gap-3">
              <SkeletonBlock className="h-10 w-10 rounded-full" />
              <SkeletonBlock className="h-3 w-48" />
              <SkeletonBlock className="h-2.5 w-32 opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
