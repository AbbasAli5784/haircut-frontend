import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import moment from "moment";
import Header from "../components/Header";

import { useNavigate, useLocation } from "react-router-dom";

const AdminPanel = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [blockedTimeSlots, setBlockedTimeSlots] = useState([]);
  const [timeSlot, setTimeSlot] = useState([]);

  const navigate = useNavigate();

  // Generate a list of timeslots for each hour between 9AM and 5PM.
  // const timeSlots = [];
  // for (let i = 9; i < 17; i++) {
  //   const formattedTime = moment({ hour: i }).format("HH:mm");
  //   timeSlots.push(formattedTime);
  // }

  const manageAppointments = () => {
    navigate("/delete-appointment");
  };

  // Generate a list of timeslots for each hour between 9AM and 5PM.
  const timeSlots = [];
  for (let i = 9; i < 17; i++) {
    const formattedTime = moment({ hour: i }).format("hh:mmA");
    timeSlots.push(formattedTime);
  }

  const fetchBlockedTimeSlots = async (date) => {
    try {
      const token = localStorage.getItem("token");
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const response = await axios.get(
        `http://localhost:3001/api/timeslots/date/${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Blocked times:", response.data);
      // Extract the time of each blocked timeslot and store it in the state
      const blockedTimes = response.data.map((timeslot) =>
        moment(timeslot.time, "HH:mm").format("hh:mm A")
      );
      const timeSlotid = response.data.map((id) => id._id);
      console.log("Blocked Times:", blockedTimeSlots);
      setBlockedTimeSlots(response.data);
      setTimeSlot(timeSlotid);

      console.log("Id:", blockedTimeSlots);
    } catch (error) {
      console.error("Failed to fetch blocked time slots:", error);
    }
  };

  useEffect(() => {
    fetchBlockedTimeSlots(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotClick = async (timeslot) => {
    console.log("handleTimeSlotClick called with timeslot:", timeslot);

    if (!timeslot) {
      // This timeslot is not blocked, so there's nothing to unblock
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("Time Slot id:", timeslot._id);

      let response;
      if (
        // blockedTimeSlots.find(
        //   (blockedTimeslot) => blockedTimeslot._id === timeslot._id
        // )
        timeslot.status === "available"
      ) {
        response = await axios.put(
          `http://localhost:3001/api/timeslots/${timeslot._id}/block`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Block response:", response);
        // const newBlockedTimeSlots = blockedTimeSlots.filter(
        //   (blockedTimeslot) => blockedTimeslot._id !== timeslot._id
        // );
        // setBlockedTimeSlots(newBlockedTimeSlots);

        await fetchBlockedTimeSlots(selectedDate);
      } else if (timeslot.booked === true) {
        alert("You cannot make a booked timeslot available!");
      } else {
        response = await axios.put(
          `http://localhost:3001/api/timeslots/${timeslot._id}/available`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // setBlockedTimeSlots([...blockedTimeSlots, timeslot]);
        await fetchBlockedTimeSlots(selectedDate);
      }

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Failed to toggle time slot:", error);
    }
  };

  const renderTimeSlot = (time) => {
    const timeslot = blockedTimeSlots.find(
      (timeslot) => timeslot.time === time
    );

    const isBlocked = timeslot ? timeslot.status === "blocked" : false;
    const isDisabled =
      timeslot?.booked === true && timeslot?.status === "blocked";
    

    return (
      <li key={time} className="list-none">
        <button
          onClick={() => handleTimeSlotClick(timeslot)}
          disabled={isDisabled}
          style={
            isDisabled
              ? { opacity: 0.2, cursor: "not-allowed", hover: "none" }
              : {}
          }
          className={`px-4 py-2 text-white rounded-md mt-2 w-full text-center ${
            isBlocked
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isBlocked ? "focus:ring-red-500" : "focus:ring-green-500"
          }`}
        >
          {time}
        </button>
      </li>
    );
  };
  return (
    <>
      <Header title="Admin Panel" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
          <div className="flex items-center justify-center mt-6 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mr-4 -mt-2 ">
              Time Managment
            </h2>
            {/* Assuming Clock is a valid image or component */}
            {/* <img src={Clock} alt="Clock" className="h-10 w-10 -ml-3" /> */}
          </div>
          <div className="flex flex-col items-center justify-center">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => handleDateChange(date)}
              inline
              className="shadow rounded-lg text-center items-center justify-center"
            />
          </div>
          <ul className="mt-6 space-y-4">
            {timeSlots.map((time) => renderTimeSlot(time))}
          </ul>
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={manageAppointments}
              className="items-center justify-center mt-6 px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Manage Appointments
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
