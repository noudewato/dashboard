import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ name, url, icon }) => {
  return (
    <NavLink to={url} className="flex justify-start align-middle p-4">
      <span className="text-lg p-2 bg-purple text-neutral rounded-2xl">
        {icon}
      </span>
      <span className="text-lg ps-5 pt-[-5px} text-slate-500 cursor-pointer hover:text-purple hover:translate-x-0">
        {name}
      </span>
    </NavLink>
  );
};

export default SidebarItem;
