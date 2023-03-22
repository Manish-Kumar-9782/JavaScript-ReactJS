import React from "react";
import Form from "../Utility/Form";
import { Book } from "../Utility/Utility";

const input_data = [
  { title: "title", label: "Title" },
  { title: "author", label: "Author" },
  { title: "subject", label: "Subject" },
  { title: "pages", label: "Pages" },
  { title: "price", label: "Price" },
];

const RegisterBook = () => {
  Book.load();
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
        model={Book}
        input_names={["title", "author", "subject", "pages", "price"]}
      />
    </div>
  );
};

export default RegisterBook;
