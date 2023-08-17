import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import moment from "moment";
import Header from "../components/Header";
import Modal from "react-modal";
import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";

const DeleteAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [newDate, setNewDate] = useState(null);
  const [newTime, setNewTime] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newService, setNewService] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);


  const getTimeSlots = async (date) => {
    try {
      const timezone = "America/New_York";
      const convertedDate = moment(date).tz(timezone).format("YYYY-MM-DD");
      const response = await axios.get(
        `http://localhost:3001/api/timeslots/date/${convertedDate}`
      );
      const data = response.data;

      const availableTimes = data
        .filter((slot) => slot.status !== "blocked" && !slot.booked)
        .map((slot) => slot.time);

      setTimeSlots(availableTimes);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };
  useEffect(() => {
    getTimeSlots(newDate);
  }, [newDate]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/bookings/booked"
      );
      setAppointments(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAppointment = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/bookings/${selectedUser}`);
      setSelectedUser(null);
      setIsDeleteModalOpen(false);
      setSnackbarMessage("Appointment Succesfully Deleted!");
      setSnackbarOpen(true);
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const updateBookingAndUser = async (event) => {
    event.preventDefault();
    let payload = {
      name: newUserName,
      phoneNumber: newPhoneNumber,
      service: newService,
    };

    if (newDate && newTime) {
      const datetime = moment(newDate).format("YYYY-MM-DD") + " " + newTime;
      const momentDateTime = moment(datetime, "YYYY-MM-DD hh:mmA");
      payload.date = momentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSS+00:00");
      payload.time = newTime;
    }

    try {
      await axios.put(
        `http://localhost:3001/api/bookings/${selectedUser}`,
        payload
      );

      setSnackbarMessage("Booking updated successfully!");
      setSnackbarOpen(true);
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-slideInRight">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
          <div className="flex items-center justify-center text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mr-4">
              Appointments
            </h2>
            <CalendarMonthIcon />
          </div>

          <ul className="mt-5 space-y-4">
            {appointments.map((appointment) => (
              <li key={appointment._id} className="rounded-md shadow-sm">
                <div
                  className="w-full flex flex-col items-center justify-center px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none transition duration-500 ease-in-out transform hover:scale-105"
                  onClick={() =>
                    setSelectedUser(
                      selectedUser === appointment._id ? null : appointment._id
                    )
                  }
                >
                  <div className="flex justify-end items-center space-x-2">
                    <PersonIcon />
                    <span>{appointment.user.name}</span>
                  </div>

                  <IconButton>
                    <ExpandMoreIcon />
                  </IconButton>
                </div>
                {selectedUser === appointment._id && (
                  <div className="px-4 py-3 bg-gray-100  ">
                    <p>
                      Date: {new Date(appointment.date).toLocaleDateString()}
                    </p>
                    <p>Time: {appointment.time}</p>
                    <p>Phone Number: {appointment.user.phone}</p>
                    <p>Service: {appointment.service}</p>
                    <div className="flex justify-between items-end">
                      <button
                        className="bg-red-500 text-white px-1 py-1 rounded hover:bg-red-600"
                        onClick={() => setIsDeleteModalOpen(true)}
                      >
                        Delete Appointment
                      </button>
                      <button
                        className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600"
                        onClick={openModal}
                      >
                        Update Appointment
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Update Modal"
          className="flex items-center justify-center mt-20 mb-20 mx-5"
          style={{
            overlay: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              position: "relative",
              backgroundColor: "white",
              borderRadius: "0.375rem",
              padding: "2rem",
              width: "100%",
              maxWidth: "32rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            },
          }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Update Appointment
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name:
              </label>
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone:
              </label>
              <input
                type="text"
                value={newPhoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Service:
              </label>
              <select
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="">Select a service</option>
                <option value="Haircut">Haircut</option>
                <option value="HairCut + Beard">HairCut + Beard</option>
                <option value="LineUp">LineUp</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date:
              </label>

              <DatePicker
                selected={newDate}
                onChange={(date) => setNewDate(date)}
                isClearable
                placeholderText="Select a Date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Time:
              </label>
              <select
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value=""></option>
                {timeSlots.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={(event) => updateBookingAndUser(event)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Booking
            </button>
          </form>
        </Modal>

        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          contentLabel="Delete Confirmation Modal"
          className="flex items-center justify-center mt-20 mb-20 mx-5"
          style={{
            overlay: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              position: "relative",
              backgroundColor: "white",
              borderRadius: "0.375rem",
              padding: "2rem",
              width: "100%",
              maxWidth: "32rem",
            },
          }}
        >
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold text-red-600 mb-6">
              Are you sure you want to delete this appointment?
            </h2>
            <div className="flex justify-center items-end">
              <button
                onClick={deleteAppointment}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 flex justify-center"
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setSnackbarOpen(false)}
            >
              <Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
};

export default DeleteAppointment;
