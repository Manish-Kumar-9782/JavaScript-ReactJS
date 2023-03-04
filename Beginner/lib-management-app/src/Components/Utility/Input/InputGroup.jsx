import React from "react";

const InputGroup = (props) => {
  return (
    <div id={props.title} className="text-start mb-4">
      <label
        htmlFor={props.title}
        style={{
          textAlign: "left",
          paddingLeft: "0.5rem",
        }}
      >
        {props.label}
      </label>
      <input type="text" name={props.title} className="form-control" />
    </div>
  );
};

export default InputGroup;
