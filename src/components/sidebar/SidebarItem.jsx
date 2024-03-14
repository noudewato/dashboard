import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const SidebarItem = ({ name, url, icon }) => {
  const location = useLocation();

  return (
    <NavLink
      to={url}
      className={`flex justify-start align-middle px-10 py-4 ${
        location.pathname === url ? "text-purple" : ""
      } transition duration-300 ease-in-out transform hover:scale-105 `}
    >
      <span className="text-lg p-2 bg-purple text-neutral rounded-2xl">
        {icon}
      </span>
      <span className="text-lg ps-5 pt-1 pt-[-5px] text-slate-500 cursor-pointer hover:text-purple hover:translate-x-0">
        {name}
      </span>
    </NavLink>
  );
};

export default SidebarItem;
