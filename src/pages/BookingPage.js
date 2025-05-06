// Importing required libraries and components
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import moment from "moment-timezone";

const BookingPage = () => {
  // Define state to store fully booked dates
  const [fullyBookedDates, setFullyBookedDates] = useState([]);

  // useEffect hook that fetches fully booked dates when the component is mounted
  useEffect(() => {
    const fetchFullyBookedDates = async () => {
      const response = await axios.get(
        "https://meencutz-8dba2b67ac9e.herokuapp.com/api/bookings/fully-booked-dates"
      );

      // Update the fully booked dates state with fetched data
      setFullyBookedDates(response.data);
    };

    fetchFullyBookedDates();
  }, []);

  // Use the location hook to get access to location state
  const location = useLocation();

  // Extract selected service from location state
  const { selectedService } = location.state;

  // Define state for the selected date. Initialize it with the current date.
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get the navigate function from the useNavigate hook
  const navigate = useNavigate();

  // Function to handle the date change
  const handleDateChange = (date) => {
    // Convert the selected date to the "America/New_York" timezone
    const dateInNyTime = moment(date).tz("America/New_York");

    const formattedDate = dateInNyTime.format("YYYY-MM-DD");

    // Update the selected date state
    setSelectedDate(formattedDate);

    // Navigate to "/time-slots" and pass along the selected date and service in the location state
    navigate("/time-slots", {
      state: {
        selectedDate: formattedDate,
        selectedService: selectedService,
      },
    });
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-slideInRight">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Select Date
            </h2>
            <div className="mt-6 flex justify-center">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => handleDateChange(date)}
                // Transform fullyBookedDates strings into Date objects in the correct timezone
                // Moment's tz function is used here to ensure dates are treated in the "America/New_York" timezone
                excludeDates={fullyBookedDates.map((dateStr) =>
                  moment.tz(dateStr, "America/New_York").toDate()
                )}
                minDate={moment.tz("America/New_York").toDate()}
                inline
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
