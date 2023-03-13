import React from "react";
import Form from "../Utility/Form";
import { setItem, getItem, getFormData } from "../Utility/Utility";

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
      <Form
        width="50%"
        inputs={input_data}
        database="Students"
        formName="Register Students"
        callback={function (e, form) {
          form = form.current;
          console.log(getItem(form.dataset.database));
          let database = null;

          if (getItem(form.dataset.database) == null) {
            setItem(form.dataset.database, []);
          }

          database = getItem(form.dataset.database);

          database.push(
            getFormData(form, ["name", "email", "contact", "address", "class"])
          );

          // Now after updating our database we need to set the database.
          setItem(form.dataset.database, database);
        }}
      />
    </div>
  );
};

export default RegisterStudents;
