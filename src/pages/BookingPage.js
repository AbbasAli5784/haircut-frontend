// src/pages/BookingPage.js

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BookingDetails from "./BookingDetails";

const BookingPage = () => {
  const location = useLocation();
  const { selectedService } = location.state;
  console.log("Selected Service in BookingPage", selectedService);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    navigate("/time-slots", {
      state: {
        selectedDate: date.toISOString(),
        selectedService: selectedService,
      },
    });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-4">
        <Col md="auto">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => handleDateChange(date)}
            inline
          />
        </Col>
      </Row>
    </Container>
  );
};

export default BookingPage;
