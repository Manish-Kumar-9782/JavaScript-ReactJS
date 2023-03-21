import React from "react";
import Form from "../Utility/Form";
import { makeFormEntry, Teacher } from "../Utility/Utility";

const input_data = [
  { title: "name", label: "Name" },
  { title: "email", label: "Email" },
  { title: "contact", label: "Contact" },
  { title: "address", label: "Address" },
  { title: "stream", label: "Stream" },
];

const RegisterTeacher = () => {
  Teacher.load();
  return (
    <div
      style={{
        borderLeft: "4px solid black",
      }}
    >
      <h3 className="text-start px-3">Teachers Registration</h3>
      <Form
        width="50%"
        inputs={input_data}
        database={Teacher.DatabaseKey}
        formName="Register Teachers"
        callback={makeFormEntry}
        input_names={["name", "email", "contact", "address", "stream"]}
      />
    </div>
  );
};

export default RegisterTeacher;
