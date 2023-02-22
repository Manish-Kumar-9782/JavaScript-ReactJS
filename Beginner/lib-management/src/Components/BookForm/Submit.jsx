import React from "react";

const Submit = (props) => {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submit called");
  }

  return (
    <input
      className="fill bg-teal"
      type="submit"
      value="Submit"
      onClick={(e) => {
        e.preventDefault();
        let data = props.submitForm(e);

        props.setRecord([
          ...props.record,
          [data.title, data.author, data.subject, data.pages, data.price],
        ]);
        data.form.reset();
      }}
    />
  );
};

export default Submit;
