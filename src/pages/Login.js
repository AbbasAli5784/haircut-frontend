import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import jwtDecode from "jwt-decode";
import { TextField } from "@mui/material";
import { AuthContext } from "../components/context/AuthContext";
import BookingSummary from "./BookingSummary";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { auth, admin, setAuth, setAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please Enter An Email!");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please Enter A Password!");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };
  const api = axios.create({
    baseURL: "http://localhost:3001/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateInputs();

    try {
      // const { selectedService, selectedDate, time } = location.state || {}; // Access state here
      if (isValid) {
        const response = await api.post("/users/login", {
          email,
          password,
        });
        localStorage.setItem("token", response.data.token);
        const decodedToken = jwtDecode(response.data.token);

        setAuth(true);
        if (decodedToken.role === "admin") {
          setAdmin(true);
        }
        // Save the token in local storage (or you might use Redux, Context API, etc.)
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;

        if (errorMessage === "User not found") {
          setEmailError("User Not Found!");
          setPasswordError(""); //clear the password error
        } else if (errorMessage === "Incorrect Password") {
          setPasswordError("Incorrect Password!");
          setEmailError("");
        } else {
          setError(errorMessage);
        }
      } else {
        // Log or set a general error message if there was a non-Axios error
        setError("An error occurred. Please try again.");
      }
    }
  };
  useEffect(() => {
    if (auth) {
      if (admin) {
        navigate("/admin-panel");
      } else {
        navigate("/select-service");
        console.log("Email:", email);
      }
    }
  }, [auth, admin, navigate]);

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-slideInRight">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <TextField
                  id="email-address"
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                />
              </div>
            </div>

            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
