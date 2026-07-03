import React from "react";

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
