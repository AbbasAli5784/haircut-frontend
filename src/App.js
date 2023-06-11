import React from "react";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SelectService from "./components/SelectService";
import TimeSlotsPage from "./pages/TimeSlotsPage";
import BookingDetails from "./pages/BookingDetails";
import Confirmation from "./pages/Confirmation";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/select-service" element={<SelectService />} />
          <Route path="/time-slots" element={<TimeSlotsPage />} />
          <Route path="/booking/:serviceID" element={<BookingPage />} />
          <Route path="booking-details" element={<BookingDetails />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
