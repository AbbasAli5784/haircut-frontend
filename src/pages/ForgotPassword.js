import React from "react";
import axios from "axios";
import { useState } from "react";
import Header from "../components/Header";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const forgotPassword = async (e) => {
    e.preventDefault();
    try {
     
      await axios.post(
        "http://localhost:3001/api/users/request-password-reset",
        {
          email,
        }
      );
    } catch (error) {
      setError(error.response.data.message);
      console.error("Error", error);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-slideInRight ">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Your Password
          </h2>
          <form className="mt-8 space-y-6" onSubmit={forgotPassword}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
            {error && (
              <p className="mt-2 text-center text-sm text-red-600">{error}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
