import { File, Folder, Home, Mail, Search, Trash, Upload } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const SideNav: React.FC = () => {
    //make active button rounded from left side
    const active_btn =
      "bg-background text-center p-2 mx-2 rounded-full font-extrabold";
    const btn =
      "text-center p-2 mx-2 hover:bg-gray-500 rounded-full font-bold";
  return (
    <div className="bg-secondary w-1/4 flex-grow">
      <div className="flex flex-col ">
        <div className="h-10 font-extrabold"></div>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? active_btn : btn)}
        >
          <div className="flex justify-start mx-3">
            <Home />
            <h1 className="ml-2">Home</h1>
          </div>
        </NavLink>
        <NavLink
          to="/upload"
          className={({ isActive }) => (isActive ? active_btn : btn)}
        >
          <div className="flex justify-start mx-3">
            <Upload />
            <h1 className="ml-2">Upload</h1>
          </div>
        </NavLink>
        <NavLink
          to="/files"
          className={({ isActive }) => (isActive ? active_btn : btn)}
        >
          <div className="flex justify-start mx-3">
            <Folder />
            <h1 className="ml-2">My Files</h1>
          </div>
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) => (isActive ? active_btn : btn)}
        >
          <div className="flex justify-start mx-3">
            <Search />
            <h1 className="ml-2">Search</h1>
          </div>
        </NavLink>
        <NavLink
          to="/bin"
          className={({ isActive }) => (isActive ? active_btn : btn)}
        >
          <div className="flex justify-start mx-3">
            <Trash />
            <h1 className="ml-2">Bin</h1>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default SideNav;
