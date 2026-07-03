import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="block mb-1.5 pl-0.5 text-sm font-medium text-ink-soft"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
          w-full px-3.5 py-2.5 rounded-md
          bg-white text-ink placeholder:text-clay/60
          border border-rule
          outline-none
          transition-colors duration-150
          focus:border-terracotta focus:ring-1 focus:ring-terracotta/30
          ${className}
        `}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
