import React, { useState } from "react";

const Input = (props) => {
  const [value, setValue] = useState("");

  return (
    <div className="input-group">
      <label htmlFor={props.title}>{props.label}</label> <br />
      <input
        id={props.title}
        type="text"
        name="props.title"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
