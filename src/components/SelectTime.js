import React from "react";

const SelectTime = ({ nextStep, previousStep }) => {
  const handleTimeSelection = (time) => {
    nextStep();
  };
  return (
    <div>
      <h2>Select a Time</h2>
      <button onClick={() => handleTimeSelection("10:00am")}>10:00am</button>
      <button onClick={() => handleTimeSelection("11:00am")}>11:00am</button>
      <button onClick={() => handleTimeSelection("12:00pm")}>12:00pm</button>
      <button onClick={() => handleTimeSelection("1:00pm")}>1:00pm</button>
      <button onClick={() => handleTimeSelection("2:00pm")}>2:00pm</button>
      <button onClick={previousStep}>Go back</button>

    </div>
  );
};

export default SelectTime;

