import React, { useRef, useState } from "react";

const Input = (props) => {
  const input = useRef();

  return (
    <div className="input-group">
      <label htmlFor={props.title}>{props.label}</label> <br />
      <input
        ref={input}
        id={props.title}
        type="text"
        name="props.title"
        onKeyDownCapture={(e) => {
          input.value = e.target.value;
        }}
      />
    </div>
  );
};

export default Input;
