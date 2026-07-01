import React, { useId } from "react";

/**
 * Select — same props (options, label, className, ...props) and forwardRef
 * wiring as before. Visual treatment matches Input so forms feel cohesive.
 */
function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-1.5 pl-0.5 text-sm font-medium text-ink-soft"
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`
          w-full px-3.5 py-2.5 rounded-md
          bg-white text-ink
          border border-rule
          outline-none cursor-pointer
          transition-colors duration-150
          focus:border-terracotta focus:ring-1 focus:ring-terracotta/30
          ${className}
        `}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
