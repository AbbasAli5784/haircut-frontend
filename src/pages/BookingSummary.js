import { React, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
// import moment from "moment";
import moment from "moment-timezone";
import Header from "../components/Header";

const BookingSummary = () => {
  const location = useLocation();
  const { bookingData } = location.state;
  const { selectedService, selectedDate, time } = location.state;
  const [email, setEmail] = useState("");
  // const { email, setEmail, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  const handleConfirm = async () => {
    console.log("Email:", email);

    try {
      await axios.post(
        "https://meencutz-8dba2b67ac9e.herokuapp.com/api/bookings",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await axios.post(
        "https://meencutz-8dba2b67ac9e.herokuapp.com/api/bookings/booking-confirmation",
        {
          email: email,
          service: selectedService.name,
          date: selectedDate,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/confirmation");
    } catch (error) {
      console.error("Error creating booking", error);
    }
  };

  useEffect(() => {
    setEmail(decodedToken.userEmail);
  }, []);
  const timezone = "America/New_York";
  const formattedDateForDisplay = moment
    .tz(bookingData.date, timezone)
    .format("MMMM Do, YYYY");

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-slideInRight">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Booking Summary
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <div className="text-gray-900">
              <p>
                <strong>Service:</strong> {bookingData.service}
              </p>
              <p>
                <strong>Date:</strong> {formattedDateForDisplay}
              </p>
              <p>
                <strong>Time:</strong> {bookingData.time}
              </p>
              <p>
                <strong>Name:</strong> {bookingData.user.name}
              </p>
              <p>
                <strong>Phone Number:</strong> {bookingData.user.phone}
              </p>
            </div>
            <div>
              <button
                onClick={handleConfirm}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingSummary;
