import React from "react";
import { useNavigate } from "react-router-dom";

import "./HomePage.css";
import Header from "../components/Header";
import Barber from "./pictures/removed.png";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/booking/login");
  };

  return (
    <>
      <Header />
      <div className="relative flex items-center justify-center h-screen bg-gray-100">
        <div
          className="w-full h-full absolute flex items-center justify-center"
          style={{ zIndex: 2 }}
        >
          <div
            className="svg-border-fadein flex flex-col items-center justify-center border-4 border-transparent rounded-3xl shadow-md bg-white space-y-0 p-10 animate-slideInRight"
            style={{ width: "300px", height: "auto" }}
          >
            <h1 className="text-4xl font-bold mb-4">Meen Cutz</h1>
            <img
              src={Barber}
              alt="Barber"
              className="h-10 w-10 -ml-3 transform -translate-y-2"
            />
            <button
              className="px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded mb-10"
              onClick={handleClick}
            >
              Book Now!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
