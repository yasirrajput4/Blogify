import React from "react";

/**
 * Button
 * Prop API is unchanged: type, bgColor, textColor, className, children, ...props.
 * `bgColor`/`textColor` still work exactly as before (any caller passing
 * literal Tailwind classes like "bg-green-500" continues to work) — we've
 * just changed the DEFAULT values so an un-styled <Button> now matches the
 * editorial system, and added consistent hover/active/disabled motion.
 */
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
