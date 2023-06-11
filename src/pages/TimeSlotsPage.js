import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../TimeSlotsPage.css";
import moment from "moment";
import "moment-timezone";

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
      const timezone = "America/Toronto";
      const convertedDate = moment(date).tz(timezone).format("YYYY-MM-DD");
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
  };

  return (
    <div className="time-slots-container">
      <div className="time-slots-wrapper">
        <div className="available-times-box">Available times</div>
        <div className="justify-content-md-center time-slots">
          {timeSlots.map((timeSlot) => (
            <div key={timeSlot} className="time-slot">
              <Button
                className="time-slot button"
                variant="outline-primary"
                disabled={bookedTimeSlots.includes(timeSlot)}
                onClick={() => handleTimeSlotClick(timeSlot)}
              >
                {timeSlot}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimeSlotsPage;
