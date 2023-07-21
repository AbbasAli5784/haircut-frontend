import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
const moment = require("moment");

const BookingDetails = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const location = useLocation();
  const { selectedService, selectedDate, time } = location.state;
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare booking data, but don't send it yet.
    const timezone = "America/New_York";
    const dateWithTime = moment.tz(
      selectedDate.split("T")[0] + " " + time,
      "YYYY-MM-DD hh:mma",
      timezone
    );
    const formattedDate = dateWithTime.toISOString();

    const bookingData = {
      service: selectedService.name,
      date: formattedDate,
      time: time,
      user: { name: name, phone: phone },
    };

    // Navigate to the summary page, passing along the booking data
    navigate("/booking-summary", { state: { bookingData } });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-slideInRight ">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Booking Details
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
