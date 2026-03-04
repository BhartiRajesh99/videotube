import Shimmer from "./Shimmer";

export default function SkeletonCard() {
  return (
    <div className="space-y-3 rounded-2xl border border-sky-100 bg-white/80 p-3 shadow-sm">
      <Shimmer className="aspect-video w-full rounded-xl" />
      <div className="flex gap-3 pt-1">
        <Shimmer className="h-9 w-9 shrink-0 rounded-full" />
        <div className="flex-1 space-y-2">
          <Shimmer className="h-3.5 w-full rounded-md" />
          <Shimmer className="h-3 w-4/5 rounded-md" />
          <Shimmer className="h-3 w-1/2 rounded-md" />
        </div>
      </div>
    </div>
  );
}