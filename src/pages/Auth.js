import React, { useState, useEffect } from "react";
// import { GoogleLogin } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { motion } from "framer-motion";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedService, selectedDate, time } = location.state || {};

  const [account, setAccount] = useState(null);

  const handleLoginClick = () => {
    navigate("/login", { state: { selectedService, selectedDate, time } });
  };

  const handleSignUpClick = () => {
    navigate("/signup", { state: { selectedService, selectedDate, time } });
  };

  const responseGoogle = (response) => {
    if (response) {
      setAccount(response);
    } else {
      console.log("No profileObj found in the response");
    }
  };

  useEffect(() => {
    console.log("Account:", account);
  }, [account]);

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-slideInRight">
        <div className="max-w-md w-full space-y-8">
          <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
            <h2 className="mt-6 mb-[-10px] text-center text-2xl font-extrabold text-gray-900">
              Please Login To Continue
            </h2>
            <center>
              <div className="group relative my-10 flex-col justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-white-600 hover:bg-grey-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <button
                  onClick={handleLoginClick}
                  className=" group relative flex  py-2 px-[73px] border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>

                <button
                  onClick={handleSignUpClick}
                  className="my-5 group relative flex py-2 px-[66px] border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>

                {/* <GoogleLogin
                  logo_alignment="center"
                  width="50"
                  onSuccess={(credentialResponse) => {
                    // navigate("/booking-details", {
                    //   state: {
                    //     selectedService,
                    //     selectedDate,
                    //     time,
                    //   },
                    // });
                    navigate("/select-service");
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                /> */}

                
              </div>
            </center>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
