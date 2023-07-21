import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../TimeSlotsPage.css";
import moment from "moment";
import "moment-timezone";
import Clock from "./pictures/clock.png";

import Header from "../components/Header";

function TimeSlotsPage() {
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(location.state.selectedDate);
  const [bookedTimeSlots, setBookedTimeSlots] = useState([]);
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(
    location.state.selectedService
  );

  const timeSlots = [];
  for (let i = 9; i < 17; i++) {
    const formattedTime = moment({ hour: i }).format("hh:00A");
    timeSlots.push(formattedTime);
  }

  const getBookedTimeSlots = async (date) => {
    try {
      const timezone = "America/New_York";
      const convertedDate = moment(date).tz(timezone).format("YYYY-MM-DD");
      console.log("Selected date:", date);
      console.log("Converted date:", convertedDate);
      const response = await axios.get(
        `http://localhost:3001/api/bookings/date/${convertedDate}`
      );
      const data = response.data;
      console.log("Data:", data);
      const bookedTimes = data.map((booking) => {
        console.log("Booking time:", booking);
        const formattedTime = moment(booking, "hh:mma").format("hh:00A");
        console.log("Formatted time:", formattedTime);

        return formattedTime;
      });
      setBookedTimeSlots(bookedTimes);
    } catch (error) {
      console.error("Error fetching booked time slots:", error);
    }
  };

  useEffect(() => {
    getBookedTimeSlots(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    console.log("Booked time slots:", bookedTimeSlots);
  }, [bookedTimeSlots]);

  const handleTimeSlotClick = async (time) => {
    console.log("Selected Time Slot:", time);
    console.log("Booked time slots:", bookedTimeSlots);
    console.log("Is time slot booked:", bookedTimeSlots.includes(time));

    navigate("/booking-details", {
      state: {
        selectedService: selectedService,
        selectedDate: selectedDate,
        time: time,
      },
    });

    console.log("location state 3:", location.state);
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-slideInRight">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
          <div>
            <div className="flex items-center justify-center mt-6 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 mr-4 -mt-2 ">
                Available Times
              </h2>
              <img src={Clock} alt="Clock" className="h-10 w-10 -ml-3" />
            </div>
            <ul className="mt-5 space-y-4">
              {timeSlots.map((timeSlot) => (
                <li key={timeSlot} className="rounded-md shadow-sm">
                  <button
                    onClick={() => handleTimeSlotClick(timeSlot)}
                    className={`${
                      bookedTimeSlots.includes(timeSlot)
                        ? "bg-gray-300"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    disabled={bookedTimeSlots.includes(timeSlot)}
                  >
                    {timeSlot}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default TimeSlotsPage;
