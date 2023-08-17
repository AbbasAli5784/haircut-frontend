import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { TextField } from "@mui/material";
const moment = require("moment");

const BookingDetails = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const location = useLocation();
  const { selectedService, selectedDate, time } = location.state;
  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;
    if (!name) {
      setNameError("Please Enter A Name!");
      isValid = false;
    } else {
      setNameError("");
    }
    if (!phone) {
      setPhoneError("Please Enter A  Valid Phone Number!");
      isValid = false;
    } else {
      setPhoneError("");
    }
    if (phone.length < 10) {
      setPhoneError("Please enter a phone number with a minimum of 10 digits.");
      isValid = false;
    } else {
      setPhoneError("");
    }
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateInputs();
    // Prepare booking data, but don't send it yet.
    if (isValid) {
      const combinedDateTime = `${selectedDate.split("T")[0]} ${time}`;

      // Convert the combined date and time to UTC
      const dateWithTime = moment.utc(combinedDateTime, "YYYY-MM-DD hh:mma");

      // Format the UTC date
      const formattedDate = dateWithTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ");

      const bookingData = {
        service: selectedService.name,
        date: formattedDate,
        time: time,
        user: { name: name, phone: phone },
      };

      // Navigate to the summary page, passing along the booking data
      navigate("/booking-summary", {
        state: { bookingData, selectedService, selectedDate, time },
      });
    }
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
                <TextField
                  id="name"
                  label="Name"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!nameError}
                  helperText={nameError}
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <TextField
                  id="phone"
                  label="Phone"
                  type="tel"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={!!phoneError}
                  helperText={phoneError}
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
