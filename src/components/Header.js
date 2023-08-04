import React, { useState } from "react";
import logo from "./logo/black.jpg";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import "./global.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const home = () => {
    navigate("/");
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full bg-white py-4 px-6 shadow-md animate-fadeInDown">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 ">
        <div className="flex items-center">
          <img
            href="/"
            src={logo}
            alt="Company Logo"
            className="h-12 mr-4"
            onClick={home}
          />
          <SocialIcon
            network="instagram"
            bgColor="##0a0a0a"
            style={{ height: 25, width: 25 }}
            url="https://instagram.com/meen_cutz?igshid=YmM0MjE2YWMzOA=="
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-10 block rounded-md bg-white p-2 focus:outline-none"
          >
            <span className="sr-only">Open user Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={home}
                >
                  Home
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
