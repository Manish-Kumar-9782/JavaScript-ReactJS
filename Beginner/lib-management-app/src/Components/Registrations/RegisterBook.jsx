import React from "react";
import Form from "../Utility/Form";
import { makeFormEntry } from "../Utility/Utility";

const input_data = [
  { title: "title", label: "Title" },
  { title: "author", label: "Author" },
  { title: "subject", label: "Subject" },
  { title: "pages", label: "Pages" },
  { title: "price", label: "Price" },
];

const RegisterBook = () => {
  return (
    <div
      style={{
        borderLeft: "4px solid black",
      }}
    >
      <h3 className="text-start px-3">Books Registration</h3>
      <Form
        width="50%"
        inputs={input_data}
        database="Books"
        formName="Register Books"
        callback={makeFormEntry}
        input_names={["title", "author", "subject", "pages", "price"]}
      />
    </div>
  );
};

export default RegisterBook;
