import React from "react";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SelectService from "./components/SelectService.js";
import TimeSlotsPage from "./pages/TimeSlotsPage";
import BookingDetails from "./pages/BookingDetails";
import Confirmation from "./pages/Confirmation";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import BookingSummary from "./pages/BookingSummary";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Auth from "./pages/Auth";
import { AuthProvider } from "./components/context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/booking/login" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/select-service" element={<SelectService />} />
          <Route path="/time-slots" element={<TimeSlotsPage />} />
          <Route path="/booking/:serviceID" element={<BookingPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="booking-details" element={<BookingDetails />} />
          <Route path="booking-summary" element={<BookingSummary />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
