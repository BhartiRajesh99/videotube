import React from "react";

function Background() {
  return (
    // <div
    //   className="fixed inset-0 -z-10 min-h-screen w-full bg-[linear-gradient(-15deg,var(--color-mint-blue)_15%,var(--color-lavender-mist)_15%)]"
    // />
    <div className="fixed inset-0 -z-10 min-h-screen w-full [background:radial-gradient(125%_100%_at_50%_0%,#fff_6.32%,#e0f0ff_29.98%,#e7effd_68.68%,#fff_100%)]" />

  );
}

export default Background;
