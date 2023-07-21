import React from "react";
import Header from "../components/Header";

const Confirmation = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-slideInRight">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
          <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Booking Confirmed!
            </h1>
          </div>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your booking has been successfully confirmed. Please check your
            email for further details.
          </p>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
