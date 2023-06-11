import React from "react";

const SelectDate =({nextStep, previousStep}) => {
  const handleDateSelection = (date) => {
    nextStep()
  }

  return (
    <div>
      <h2>Select A Date</h2>
      <button onClick={() => handleDateSelection("2023-04-30")}>April 30, 2023</button>
      <button onClick={previousStep}>Go back</button>
    </div>
  )
}

export default SelectDate;