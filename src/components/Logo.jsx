import React from "react";

/**
 * Logo — same `width` prop API as before. Renders as a masthead-style
 * wordmark (serif, tight tracking) rather than a placeholder block, since
 * it's the anchor of the header/footer "nameplate."
 */
function Logo({ width = "100px" }) {
  return (
    <div style={{ width }} className="select-none">
      <span className="font-display font-semibold text-2xl tracking-tight text-ink whitespace-nowrap">
        Blog<span className="text-terracotta">ify</span>
      </span>
    </div>
  );
}

export default Logo;
