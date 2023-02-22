import React, { useRef, useState } from "react";
import Input from "./Input";
import Submit from "./Submit";

function submitForm(e, form) {
  console.log("event:", e);
  console.log("form:", form);
  console.log("form:", form);
  return {
    title: form.current["Title"].value,
    author: form.current["Author"].value,
    subject: form.current["Subject"].value,
    pages: form.current["Pages"].value,
    price: form.current["Price"].value,
    form: form.current,
  };
}

const BookForm = (props) => {
  const form = useRef();

  const [counting, resetValues] = useState(10);

  console.log("our form: ", form);

  return (
    <div className="form" value={counting}>
      <form ref={form} action="#">
        <Input title="Title" label="Book Title: " />
        <Input title="Author" label="Book Author: " />
        <Input title="Subject" label="Book Subject: " />
        <Input title="Pages" label="Book Pages: " />
        <Input title="Price" label="Book Price: " />
        <Submit
          record={props.record}
          setRecord={props.setRecord}
          reset={resetValues}
          submitForm={(e) => submitForm(e, form)}
        />
      </form>
    </div>
  );
};

export default BookForm;
