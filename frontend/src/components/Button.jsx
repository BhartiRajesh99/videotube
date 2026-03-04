import React from "react";

function Button({ type, children }) {
  return (
    <button
      type={type}
      className="relative mt-4 w-full cursor-pointer self-center overflow-hidden rounded-md bg-black py-2 font-semibold text-white duration-200 text-shadow-lg after:absolute after:-top-20 after:-left-35 after:h-100 after:w-1/2 after:rotate-25 after:bg-white/12 after:backdrop-blur-[0.5px] after:transition-all after:duration-700 after:ease-in-out after:content-[''] hover:-translate-y-px hover:bg-neutral-800 hover:after:translate-x-[210%] active:scale-99"
    >
      {children}
    </button>
  );
}

export default Button;
