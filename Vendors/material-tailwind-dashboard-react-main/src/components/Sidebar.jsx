import { useState } from "react";
import { NavLink } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Icon from "@material-tailwind/react/Icon";
import H6 from "@material-tailwind/react/Heading6";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState("-left-64");
  return (
    <>
      {/* <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} /> */}
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="relative flex-col items-stretch min-h-full px-0 flex-nowrap">
          <a
            href="https://material-tailwind.com?ref=mtd"
            target="_blank"
            rel="noreferrer"
            className="inline-block w-full mt-2 text-center"
          >
            <H6 color="gray">Material Tailwind</H6>
          </a>
          <div className="flex flex-col">
            <hr className="min-w-full my-4" />

            <ul className="flex flex-col min-w-full list-none">
              <li className="mb-4 rounded-lg">
                <NavLink
                  to="/"
                  exact
                  className="flex items-center gap-4 px-4 py-3 text-sm font-light text-gray-700 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <Icon name="dashboard" size="2xl" />
                  Dashboard
                </NavLink>
              </li>
              <li className="mb-2 rounded-lg">
                <NavLink
                  to="/settings"
                  className="flex items-center gap-4 px-4 py-3 text-sm font-light text-gray-700 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <Icon name="settings" size="2xl" />
                  Settings
                </NavLink>
              </li>
              <li className="mb-2 rounded-lg ">
                <NavLink
                  to="/tables"
                  className="flex items-center gap-4 px-4 py-3 text-sm font-light text-gray-700 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <Icon name="toc" size="2xl" />
                  Tables
                </NavLink>
              </li>
              <li className="mb-2 text-gray-700 rounded-lg">
                <NavLink
                  to="/maps"
                  className="flex items-center gap-4 px-4 py-3 text-sm font-light text-gray-700 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <Icon name="map" size="2xl" />
                  Maps
                </NavLink>
              </li>
              <li className="px-4 mb-2 text-gray-700 rounded-lg">
                <a
                  href="https://demos.creative-tim.com/material-tailwind-kit-react/#/login"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 py-3 text-sm font-light"
                >
                  <Icon name="fingerprint" size="2xl" />
                  Login
                </a>
              </li>
              <li className="px-4 mb-2 text-gray-700 rounded-lg">
                <a
                  href="https://demos.creative-tim.com/material-tailwind-kit-react/#/register"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 py-3 text-sm font-light"
                >
                  <Icon name="list_alt" size="2xl" />
                  Register
                </a>
              </li>
              <li className="px-4 mb-2 text-gray-700 rounded-lg">
                <a
                  href="https://demos.creative-tim.com/material-tailwind-kit-react/#/landing"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 py-3 text-sm font-light"
                >
                  <Icon name="web" size="2xl" />
                  Landing Page
                </a>
              </li>
              <li className="px-4 mb-2 text-gray-700 rounded-lg">
                <a
                  href="https://demos.creative-tim.com/material-tailwind-kit-react/#/profile"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 py-3 text-sm font-light"
                >
                  <Icon name="account_circle" size="2xl" />
                  Profile Page
                </a>
              </li>
            </ul>

            <ul className="absolute bottom-0 flex flex-col min-w-full list-none">
              <li className="px-4 mb-2 text-white rounded-lg bg-gradient-to-tr from-light-blue-500 to-light-blue-700">
                <a
                  href="https://material-tailwind.com/documentation/quick-start"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 py-3 text-sm font-light"
                >
                  <Icon name="description" size="2xl" />
                  Documentation
                </a>
              </li>
              <li className="px-4 text-white rounded-lg bg-gradient-to-tr from-purple-500 to-purple-700">
                <a
                  href="https://www.creative-tim.com/product/material-tailwind-dashboard-react"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-4 py-3 text-sm font-light"
                >
                  Free Download
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
