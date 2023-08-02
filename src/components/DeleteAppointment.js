import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import moment from "moment";
import Header from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";

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

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/bookings/booked"
      );
      console.log("Response:", response.data);
      setAppointments(response.data.data);
    } catch (err) {
      console.error("Error", err);
    }
  };

  const deleteAppointment = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/bookings/${selectedUser}`);

      console.log("Booking Deleted!");
      setSelectedUser(null);
      fetchAppointments();
    } catch (err) {
      console.error("Error", err);
    }
  };

  const fetchTimeSlots = async () => {
    console.log("Test Log");
    const response = await axios.get("http://localhost:3001/api/timeslots/");
    setTimeSlots(response.data.data);
  };

  const updateAppointment = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/api/bookings/${selectedUser}`,
        {
          date: newDate,
          time: newTime,
        }
      );

      console.log("Booking Updated!");
      setNewDate(null);
      setNewTime("");
      setSelectedUser(null);
      fetchAppointments();
    } catch (err) {
      console.error("Error", err);
    }
  };

  const updateUser = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/users/${selectedUser}`, {
        name: newUserName,
        phoneNumber: newPhoneNumber,
        service: newService,
      });

      console.log("User Updated!");
      fetchAppointments();
    } catch (err) {
      console.error("Error", err);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  useEffect(() => {
    // console.log("Appointemnts", appointments);
    fetchAppointments();
    fetchTimeSlots();
  }, []);
  console.log("Selected User", selectedUser);
  console.log("Response:", appointments);
  console.log("Time Slots:", timeSlots);

  return (
    <div>
      <button onClick={fetchAppointments}>Test Button</button>

      <div>
        {appointments.map((x) => {
          console.log("x.user:", x.user);
          return (
            <div key={x._id} className="mt-4">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() =>
                  setSelectedUser(selectedUser === x._id ? null : x._id)
                }
              >
                {x.user.name}
              </button>
              {selectedUser === x._id && (
                <div>
                  <p>Date: {x.date}</p>
                  <p>Time: {x.time}</p>
                  <p>Phone Number: {x.user.phone}</p>
                  <p>Service: {x.service}</p>
                  <button onClick={deleteAppointment}>
                    Delete Appointment
                  </button>
                  <br></br>
                  <button onClick={openModal}>Update Appointment</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Update Modal"
      >
        <h2>Update Appointment</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
            />
          </label>
          <label>
            Service:
            <input
              type="text"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
            />
          </label>
          <label>
            Date:
            <DatePicker
              selected={newDate}
              onChange={(date) => setNewDate(date)}
            />
          </label>
          <label>
            Time:
            <select
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            >
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
          <button onClick={(event) => updateUser(event)}>Update User</button>
          <button onClick={(event) => updateAppointment(event)}>
            Update Booking
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default DeleteAppointment;
