import React from "react";
import Form from "../Utility/Form";
import { Student, makeFormEntry } from "../Utility/Utility";

const input_data = [
  { title: "name", label: "Name" },
  { title: "email", label: "Email" },
  { title: "contact", label: "Contact" },
  { title: "address", label: "Address" },
  { title: "class", label: "Class" },
];

const RegisterStudents = () => {
  Student.load();
  console.log(Student.RowRecord);
  console.log(Student.Records);
  return (
    <div
      style={{
        borderLeft: "4px solid black",
      }}
    >
      <h3 className="text-start px-3">Student Registration</h3>
      <Form
        width="50%"
        inputs={input_data}
        database="Students"
        formName="Register Students"
        callback={makeFormEntry}
        input_names={["name", "email", "contact", "address", "class"]}
      />
    </div>
  );
};

export default RegisterStudents;
