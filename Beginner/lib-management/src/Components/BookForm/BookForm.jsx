import React, { useState } from "react";
import Input from "./Input";
import Submit from "./Submit";

const defaultRecord = {
  title: "",
  author: "",
  subject: "",
  pages: "",
  price: "",
};

const BookForm = (props) => {
  //   const [formRecord, setFormRecord] = useState(defaultRecord);

  return (
    <div className="form">
      <form action="#">
        <Input title="Title" label="Book Title: " />
        <Input title="Author" label="Book Author: " />
        <Input title="Subject" label="Book Subject: " />
        <Input title="Pages" label="Book Pages: " />
        <Input title="Price" label="Book Price: " />
        <Submit record={props.record} setRecord={props.setRecord} />
      </form>
    </div>
  );
};

export default BookForm;
