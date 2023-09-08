import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (!token) {
      alert("Invalid or expired token!");
      return;
    }

    const response = await fetch(
      "https://meencutz-8dba2b67ac9e.herokuapp.com/api/users/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resetToken: token, newPassword }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
    } else {
      alert(data.error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter New Password</label>
        <TextField
          id="new-password"
          label="New Password"
          type="password"
          autoComplete="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <br />
        <label>ReEnter New Password</label>
        <TextField
          id="confirm-password"
          label="Confirm Password"
          type="password"
          autoComplete="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <br />
        <Button type="submit" variant="contained" color="primary">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
