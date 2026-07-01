import React from "react";

// Same single-prop API (children only). Slightly narrower max-width than
// before (7xl -> 6xl) — editorial reading widths are narrower than typical
// SaaS dashboards, which makes long-form content feel intentional rather
// than stretched.
function Container({ children }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">{children}</div>
  );
}

export default Container;
