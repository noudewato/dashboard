/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const TopBar = ({ pageTilte }) => {
  return (
    <div className="flex items-center my-3 p-1">
      <NavLink
        to={"/"}
        className="p-2 text-md font-semibold shadow-xl rounded-lg"
      >
        Dashboard
      </NavLink>
      <div className="p-2 ms-3 text-md text-gray400 font-semibold shadow-xl rounded-lg">
        {pageTilte}
      </div>
    </div>
  );
};

export default TopBar;
