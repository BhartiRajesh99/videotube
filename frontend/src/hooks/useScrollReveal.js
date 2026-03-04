import { useState, useRef, useEffect, useCallback } from "react";

export function useScrollReveal() {
  const [revealed, setRevealed] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.dataset.rid;

          setRevealed((prev) => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            next.add(id);
            return next;
          });

          observerRef.current.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    return () => observerRef.current.disconnect();
  }, []);

  const reg = useCallback(
    (id) => (el) => {
      if (!el || !observerRef.current) return;
      el.dataset.rid = id;
      observerRef.current.observe(el);
    },
    []
  );

  return { revealed, reg };
}