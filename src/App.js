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
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Auth from "./pages/Auth";
import { AuthProvider } from "./components/context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminPanel from "./components/AdminPanel";
import DeleteAppointment from "./components/DeleteAppointment";
import UpdateBooking from "./pages/UpdateBooking";
import AuthRedirect from "./components/AuthRedirect";
import ResetPassword from "./pages/ResetPassword";

// import { Update } from "@mui/icons-material";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AuthRedirect />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking/login" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/update-booking"
            element={<ProtectedRoute element={<UpdateBooking />} />}
          />
          <Route
            path="/admin-panel"
            element={<ProtectedAdminRoute element={<AdminPanel />} />}
          />
          <Route
            path="/delete-appointment"
            element={<ProtectedAdminRoute element={<DeleteAppointment />} />}
          />
          <Route
            path="/select-service"
            element={<ProtectedRoute element={<SelectService />} />}
          />
          <Route
            path="/time-slots"
            element={<ProtectedRoute element={<TimeSlotsPage />} />}
          />
          <Route
            path="/booking/:serviceID"
            element={<ProtectedRoute element={<BookingPage />} />}
          />

          <Route
            path="/booking-details"
            element={<ProtectedRoute element={<BookingDetails />} />}
          />
          <Route
            path="/booking-summary"
            element={<ProtectedRoute element={<BookingSummary />} />}
          />
          <Route
            path="/confirmation"
            element={<ProtectedRoute element={<Confirmation />} />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
