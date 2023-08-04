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
    // Convert the formattedTime back to 24-hour format to match the time value in the blockedTimeSlots array
    // const timeIn24HourFormat = moment(formattedTime, "hh:mmA").format("HH:mm");
    // const timeIn12HourFormat = moment(timeIn24HourFormat, "HH:mm").format(
    //   "hh:mm A"
    // );
    // Find the timeslot object that corresponds to this time

    const timeslot = blockedTimeSlots.find(
      (timeslot) => timeslot.time === time
    );
    // console.log("Time Slot:", timeslot);
    // console.log("TIme in 12:00hours", timeIn12HourFormat);
    // If there is no such timeslot, it means this time is not blocked
    const isBlocked = !!timeslot;

    return (
      // key={time}
      // className={`list-group-item ${
      //   isBlocked ? "list-group-item-danger" : ""
      // }`}
      // onClick={() => handleTimeSlotClick(timeslot)}
      // disabled={time.booked === true}

      <li key={time}>
        <button
          // className="bg-indigo-600 hover:bg-indigo-700"
          // type="button"
          // style={{ backgroundColor: "blue" }}
          // className={`list-group-item ${
          //   isBlocked ? "list-group-item-danger" : ""
          // }`}
          onClick={() => handleTimeSlotClick(timeslot)}
          disabled={time.booked === true}
        >
          {time}
        </button>
      </li>
    );
  };

  const renderTimeSlots = () => {
    return timeSlots.map((timeSlot) => renderTimeSlot(timeSlot));
  };

  return (
    <div>
      <Header title="Admin Panel" />
      <DatePicker
        selected={selectedDate}
        onChange={(date) => handleDateChange(date)}
        inline
      />
      <ul>
        <div>{renderTimeSlots()}</div>
      </ul>
      <button onClick={manageAppointments}>Manage Appointments</button>
    </div>
  );
};

export default AdminPanel;
