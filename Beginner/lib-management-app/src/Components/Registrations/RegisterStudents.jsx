import React from "react";
import Form from "../Utility/Form";

const input_data = [
  { title: "name", label: "Name" },
  { title: "email", label: "Email" },
  { title: "contact", label: "Contact" },
  { title: "address", label: "Address" },
  { title: "class", label: "Class" },
];

const RegisterStudents = () => {
  return (
    <div>
      <Form width="50%" inputs={input_data} />
    </div>
  );
};

export default RegisterStudents;
