import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { NavLink } from "react-router-dom";

function Back() {
  return (
    <div className="relative">
      <NavLink
        to={-1}
        className="absolute top-2 cursor-pointer rounded-full border border-slate-300 p-2 shadow"
      >
        <AiOutlineLeft size={17} className="" />
      </NavLink>
    </div>
  );
}

export default Back;
