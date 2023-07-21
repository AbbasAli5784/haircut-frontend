import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./HomePage.css";
import Header from "../components/Header";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/booking/login");
  };

  return (
    <>
      <Header />
      <div className="relative flex items-center justify-center h-screen bg-gray-100">
        <svg
          className="svg-border absolute"
          width="100%"
          height="100%"
          style={{ zIndex: 1 }}
        >
          <rect
            x="50%"
            y="50%"
            width="300"
            height="150"
            transform="translate(-150, -75)"
            stroke="black"
            fill="transparent"
            strokeWidth="10"
            strokeDasharray="900"
            strokeDashoffset="900"
            rx="30"
            ry="30"
          />
        </svg>

        <div
          className="w-full h-full absolute flex items-center justify-center"
          style={{ zIndex: 2 }}
        >
          <motion.div
            className="svg-border-fadein flex flex-col items-center justify-center border-4 border-transparent rounded-3xl shadow-md bg-white space-y-8 p-10"
            style={{
              width: "300px",
              height: "150px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 1.0 }}
          >
            <motion.h1
              className="text-4xl font-bold mb-4"
              initial={{ x: "-100vw", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", delay: 0.2, duration: 3 }}
            >
              Meen Cutz
            </motion.h1>

            <motion.button
              initial={{ x: "100vw", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", delay: 0.5, duration: 3 }}
              className="px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded mb-10"
              onClick={handleClick}
            >
              Book Now!
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
