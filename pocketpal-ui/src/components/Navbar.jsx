import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "react-avatar";
import { AppContext } from "../context/AppContext";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userData = useContext(AppContext);

  // console.log(userData.userData.username);

  return (
    <div className="shadow-md">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="PocketPal Logo"
            className="h-12 w-12 sm:h-16 sm:w-16 cursor-pointer"
            onClick={() => navigate("/home")}
          />

          <h1
            onClick={() => navigate("/home")}
            className="text-2xl sm:text-4xl font-semibold cursor-pointer"
          >
            PocketPal
          </h1>
        </div>

        <div className="block sm:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl focus:outline-none"
          >
            {isMenuOpen ? "×" : "≡"}
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-7 text-lg">
          <ul className="flex items-center gap-5">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "hover:text-emerald-600"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/add-transactions"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "hover:text-emerald-600"
              }
            >
              Add Transactions
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "hover:text-emerald-600"
              }
            >
              History
            </NavLink>
            <NavLink
              to="/budget-management"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "hover:text-emerald-600"
              }
            >
              Budget Management
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "hover:text-emerald-600"
              }
            >
              Settings
            </NavLink>
          </ul>
        </div>

        <div className="hidden sm:flex items-center cursor-pointer group relative">
          <Avatar
            color={Avatar.getRandomColor("sitebase", ["red", "green", "blue"])}
            name={userData.userData.username}
            size="50"
            round={true}
            textSizeRatio={2}
            src="*"
          />
          <div className="absolute right-0 pt-28 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
            <div className="min-w-48 bg-emerald-100 rounded p-2 px-3">
              <p
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                className="hover:text-black cursor-pointer"
              >
                LogOut
              </p>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden fixed top-0 left-0 w-full h-full bg-[#1c1c1c] text-white z-30 flex flex-col items-center justify-center gap-10">
          <ul className="flex flex-col items-center gap-5 text-2xl font-semibold">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "text-emerald-600" : "hover:text-emerald-600"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/add-transactions"
              className={({ isActive }) =>
                isActive ? "text-emerald-600" : "hover:text-emerald-600"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Add Transactions
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? "text-emerald-600" : "hover:text-emerald-600"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              History
            </NavLink>
            <NavLink
              to="/budget-management"
              className={({ isActive }) =>
                isActive ? "text-emerald-600" : "hover:text-emerald-600"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Budget Management
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "text-emerald-600" : "hover:text-emerald-600"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Settings
            </NavLink>
          </ul>
          <button
            className="text-lg text-gray-600 hover:text-black"
            onClick={() => setIsMenuOpen(false)}
          >
            Close Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
