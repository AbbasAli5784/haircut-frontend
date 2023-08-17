import React, { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../TimeSlotsPage.css";
import moment from "moment";
import "moment-timezone";
import Clock from "./pictures/clock.png";

import Header from "../components/Header";

function TimeSlotsPage() {
  const location = useLocation();
  const [selectedDate] = useState(location.state.selectedDate);
  const [bookedTimeSlots, setBookedTimeSlots] = useState([]);
  const navigate = useNavigate();
  const [selectedService] = useState(location.state.selectedService);

  const [timeSlots, setTimeSlots] = useState([]);

  const backClick = () => {
    navigate(`/booking/${selectedService.id}`, {
      state: { selectedService: selectedService },
    });
  };
  const getTimeSlots = async (date) => {
    // modified this function
    try {
      const timezone = "America/New_York";
      const convertedDate = moment(date).tz(timezone).format("YYYY-MM-DD");
      const response = await axios.get(
        `http://localhost:3001/api/timeslots/date/${convertedDate}`
      );
      const data = response.data;

      // const times = data.map((ts) => moment(ts.date).format("hh:00A"));
      const times = data;
      times.forEach((element) => {
        element.formattedTime = moment(element.date).format("hh:00A");
      });

      const bookedTimes = data
        .filter((ts) => ts.status === "available")
        .map((ts) => moment(ts.date).format("hh:00A"));
      setTimeSlots(times);

      setBookedTimeSlots(bookedTimes);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };

  useEffect(() => {
    getTimeSlots(selectedDate); // modified this line
  }, [selectedDate]);

  useEffect(() => {}, [bookedTimeSlots]);

  const handleTimeSlotClick = async (time) => {
    // const formattedDate = moment(selectedDate).format("YYYY-MM-DD");

    navigate("/booking-details", {
      state: {
        selectedService: selectedService,
        selectedDate: selectedDate,
        time: time,
      },
    });
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
                <li key={timeSlot.date} className="rounded-md shadow-sm">
                  <button
                    onClick={() => handleTimeSlotClick(timeSlot.time)}
                    className={`${
                      timeSlot.status === "blocked"
                        ? "bg-gray-300"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    disabled={timeSlot.status === "blocked"}
                  >
                    {timeSlot.time}
                  </button>
                </li>
              ))}
              <div className="flex flex-col items-center justify-center w-1/6 mx-auto mt-4">
                <div className="flex flex-col items-center justify-center bg-gray-600 hover:bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  <button onClick={backClick} className="h-10 w-32 text-center">
                    Back
                  </button>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default TimeSlotsPage;
