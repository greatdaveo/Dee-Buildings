import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-purple-200 shadow-md">
      <nav className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"} className="flex flex-wrap font-bold text-sm sm:text-xl">
          <span className="flex text-purple-600">
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 sm:h-6 sm:w-6 lg:w-8"
              >
                <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" />
                <path
                  fillRule="evenodd"
                  d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z"
                  clipRule="evenodd"
                />
              </svg>
            </i>
            Dee
          </span>
          <span className="text-purple-900">Buildings</span>
        </Link>

        <div className="flex items-center bg-purple-100 p-3 rounded-3xl">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 h-4 sm:w-32 lg:w-64"
          />
          <i className="text-purple-600">
            <FaSearch />
          </i>
        </div>

        <div>
          <ul className="flex gap-3">
            <Link to={"/"}>
              <li className="hidden sm:inline text-purple-600 hover:underline">
                Home
              </li>
            </Link>

            <Link to={"/about"}>
              <li className="hidden sm:inline text-purple-600 hover:underline">
                About
              </li>
            </Link>

            <Link to={"login"}>
              <li className="text-purple-600 hover:underline">Login </li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
