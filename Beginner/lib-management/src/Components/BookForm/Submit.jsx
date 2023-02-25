import React, { useState } from "react";

const Submit = (props) => {
  const [id, setId] = useState(1);
  return (
    <input
      className="fill bg-teal"
      type="submit"
      value="Submit"
      onClick={(e) => {
        e.preventDefault();
        // data is an object containing the title, author, subject, pages and price.
        let data = props.submitForm(e);

        /**
         *  title: form.current["Title"].value,
    author: form.current["Author"].value,
    subject: form.current["Subject"].value,
    pages: form.current["Pages"].value,
    price: form.current["Price"].value,
         */

        let mapdata = new Map();

        // putting all the old data into the new Map
        props.record.forEach((value, key) => {
          console.log(key, value);
          mapdata.set(key, value);
        });

        // adding new data.
        mapdata.set(id, [
          data.title,
          data.author,
          data.subject,
          data.pages,
          data.price,
        ]);
        setId(id + 1);

        props.setRecord(mapdata);
        data.form.reset();
      }}
    />
  );
};

export default Submit;
