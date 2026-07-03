import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-ink hover:bg-terracotta",
  textColor = "text-paper",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        inline-flex items-center justify-center gap-2
        px-5 py-2.5 rounded-md
        text-sm font-medium tracking-wide
        transition-all duration-200 ease-out
        active:scale-[0.97]
        disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
        ${bgColor} ${textColor} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
