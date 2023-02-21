import React from "react";

const Submit = () => {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submit called");
  }

  return (
    <input
      className="fill bg-teal"
      type="submit"
      value="Submit"
      onClick={(e) => handleSubmit(e)}
    />
  );
};

export default Submit;
