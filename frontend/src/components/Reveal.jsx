

export default function Reveal({
  id,
  revealed,
  reg,
  children,
  className = "",
  delay = "",
  dir = "up",
}) {
  const vis = revealed.has(id);
  const hidden =
    dir === "up"
      ? "opacity-0 translate-y-8"
      : dir === "left"
        ? "opacity-0 -translate-x-8"
        : dir === "right"
          ? "opacity-0 translate-x-8"
          : "opacity-0 scale-95";
  return (
    <div
      ref={reg(id)}
      className={`transition-all duration-700 ease-out ${delay} ${vis ? "translate-x-0 translate-y-0 scale-100 opacity-100" : hidden} ${className}`}
    >
      {children}
    </div>
  );
}