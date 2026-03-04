export default function Shimmer({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-sky-100/60 ${className}`}
    >
      <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/70 to-transparent" />
    </div>
  );
}