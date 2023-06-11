import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
const moment = require("moment");

const BookingDetails = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const location = useLocation();
  const { selectedService, selectedDate, time } = location.state;
  const navigate = useNavigate();
  console.log("Selected Service Booking Details:", selectedService.name);
  console.log("Date:", selectedDate);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const time24h = moment(time, "hh:mma").format("HH:mm");

    const dateObject = new Date(selectedDate);

    const formattedDate = `${dateObject.getUTCFullYear()}-${String(
      dateObject.getUTCMonth() + 1
    ).padStart(2, "0")}-${String(dateObject.getUTCDate()).padStart(
      2,
      "0"
    )}T${time24h}:00.000Z`;
    console.log("Selected DATE", formattedDate);
    console.log("Time", time);
    try {
      console.log("Booking object", {
        service: selectedService.name,
        date: formattedDate,
        time: time,
        user: { name, phone },
      });
      await axios.post("http://localhost:3001/api/bookings", {
        service: selectedService.name,
        date: formattedDate,
        time: time,
        user: { name, phone },
      });
      navigate("/confirmation");
    } catch (error) {
      console.error("Error creating booking", error);
    }
  };

  return (
    <Container>
      <h1>Booking Details</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default BookingDetails;
