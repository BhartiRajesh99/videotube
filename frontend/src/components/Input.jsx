import React from "react";
import { cn } from "../lib/utils.js";

function Input({ type, name, label, placeholder, value, onChange, className }) {
  return (
    <label>
      <span className="text-sm font-medium text-neutral-800 after:ml-0.5 after:text-red-500 after:content-['*']">
        {label}
      </span>

      <input
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        name={name}
        type={type}
        className={cn(
          className,
          "durantion-200 w-full border-b border-l-2 border-b-slate-200 border-l-transparent px-1 py-2 text-sm tracking-tight transition-all ease-in-out placeholder:text-xs placeholder:text-slate-500 focus:border-l-2 focus:border-l-slate-700 focus:bg-neutral-100 focus:outline-none",
        )}
      />
    </label>
  );
}

export default Input;
