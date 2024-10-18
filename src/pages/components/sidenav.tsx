import React from "react";
import { NavLink } from "react-router-dom";

const SideNav: React.FC = () => {
    //make active button rounded from left side
    const active_btn = "bg-background text-center p-2 mx-2 rounded-full";
    const btn = "text-center p-2 mx-2 hover:bg-gray-500 rounded-full";
  return (
    <div className="bg-secondary w-1/4 flex-grow">
      <div className="flex flex-col ">
        <div className="h-10"></div>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? active_btn : btn)}
          >
            Home
          </NavLink>
          <NavLink
            to="/upload"
            className={({ isActive }) => (isActive ? active_btn : btn)}
          >
            Upload
          </NavLink>
      </div>
    </div>
  );
};

export default SideNav;
