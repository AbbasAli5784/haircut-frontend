import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import moment from "moment";
import Header from "../components/Header";

const AdminPanel = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [blockedTimeSlots, setBlockedTimeSlots] = useState([]);

  // Generate a list of timeslots for each hour between 9AM and 5PM.
  const timeSlots = [];
  for (let i = 9; i < 17; i++) {
    const formattedTime = moment({ hour: i }).format("HH:mm");
    timeSlots.push(formattedTime);
  }

  const fetchBlockedTimeSlots = async (date) => {
    try {
      const token = localStorage.getItem("token");
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const response = await axios.get(
        `http://localhost:3001/api/timeslots/date/${formattedDate}/blocked`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Blocked times:", response.data);
      setBlockedTimeSlots(response.data);
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

  const handleTimeSlotClick = async (time) => {
    try {
      const token = localStorage.getItem("token");
      const formattedTime = moment(time, "HH:mm").format("HH:mmA");
      await axios.put(
        `http://localhost:3001/api/timeslots/${formattedTime}/block`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBlockedTimeSlots([...blockedTimeSlots, formattedTime]);
    } catch (error) {
      console.error("Failed to block time slot:", error);
    }
  };

  return (
    <div>
      <Header title="Admin Panel" />
      <DatePicker
        selected={selectedDate}
        onChange={(date) => handleDateChange(date)}
        inline
      />
      <div>
        {timeSlots.map((timeSlot) => (
          <button
            key={timeSlot}
            onClick={() => handleTimeSlotClick(timeSlot)}
            style={{
              backgroundColor: blockedTimeSlots.includes(timeSlot)
                ? "gray"
                : "white",
            }}
          >
            {timeSlot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
